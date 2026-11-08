package enhancers

import (
	"context"
	"encoding/binary"
	"math"

	"github.com/talkincode/toughradius/v9/internal/radiusd/plugins/auth"
	"github.com/talkincode/toughradius/v9/internal/radiusd/vendors"
	"layeh.com/radius"
	"layeh.com/radius/rfc2865"
)

// WISPr (Wi-Fi Alliance, vendor 14122) bandwidth attributes, values in bit/s.
const (
	wisprBandwidthMaxUp   byte = 7
	wisprBandwidthMaxDown byte = 8
)

// wisprVSA builds a Vendor-Specific (26) attribute carrying one WISPr integer.
func wisprVSA(attrType byte, value uint32) radius.Attribute {
	b := make([]byte, 10)
	binary.BigEndian.PutUint32(b[0:4], 14122)
	b[4] = attrType
	b[5] = 6
	binary.BigEndian.PutUint32(b[6:10], value)
	return radius.Attribute(b)
}

// RuijieAcceptEnhancer applies the profile bandwidth to Ruijie / Reyee devices.
// Ruijie gateways and APs honour the WISPr bandwidth attributes for portal and
// 802.1X users; values are sent in bit/s (profile rates are Kbps).
type RuijieAcceptEnhancer struct{}

func NewRuijieAcceptEnhancer() *RuijieAcceptEnhancer {
	return &RuijieAcceptEnhancer{}
}

func (e *RuijieAcceptEnhancer) Name() string {
	return "accept-ruijie"
}

func (e *RuijieAcceptEnhancer) Enhance(ctx context.Context, authCtx *auth.AuthContext) error {
	if authCtx == nil || authCtx.Response == nil || authCtx.User == nil {
		return nil
	}
	if !matchVendor(authCtx, vendors.CodeRuijie) {
		return nil
	}

	var profileCache interface{}
	if authCtx.Metadata != nil {
		profileCache = authCtx.Metadata["profile_cache"]
	}
	upRate := int64(authCtx.User.GetUpRate(profileCache))
	downRate := int64(authCtx.User.GetDownRate(profileCache))

	if upRate > 0 {
		authCtx.Response.Add(rfc2865.VendorSpecific_Type, wisprVSA(wisprBandwidthMaxUp, uint32(clampInt64(upRate*1000, math.MaxUint32)))) //nolint:gosec // G115: clamped
	}
	if downRate > 0 {
		authCtx.Response.Add(rfc2865.VendorSpecific_Type, wisprVSA(wisprBandwidthMaxDown, uint32(clampInt64(downRate*1000, math.MaxUint32)))) //nolint:gosec // G115: clamped
	}
	return nil
}
