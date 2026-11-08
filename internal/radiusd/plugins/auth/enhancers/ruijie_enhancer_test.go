package enhancers

import (
	"encoding/binary"
	"testing"
)

func TestWisprVSA(t *testing.T) {
	a := wisprVSA(wisprBandwidthMaxDown, 10_000_000)
	if len(a) != 10 {
		t.Fatalf("len=%d", len(a))
	}
	if binary.BigEndian.Uint32(a[0:4]) != 14122 || a[4] != 8 || a[5] != 6 {
		t.Fatalf("bad header % x", []byte(a))
	}
	if binary.BigEndian.Uint32(a[6:10]) != 10_000_000 {
		t.Fatalf("bad value")
	}
}
