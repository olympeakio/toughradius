import {
  List,
  Datagrid,
  TextField,
  DateField,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  SelectInput,
  Create,
  Show,
  SimpleShowLayout,
  FilterButton,
  TopToolbar,
  CreateButton,
  ExportButton,
} from 'react-admin';

// 系统设置列表操作栏
const SettingsListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

// 系统设置列表
export const SystemSettingsList = () => (
  <List actions={<SettingsListActions />} filters={settingsFilters}>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="type" label="resources.system/settings.fields.type" />
      <TextField source="name" label="resources.system/settings.fields.name" />
      <TextField source="value" label="resources.system/settings.fields.value" />
      <TextField source="sort" label="resources.system/settings.fields.sort" />
      <TextField source="remark" label="resources.system/settings.fields.remark" />
      <DateField source="created_at" label="resources.system/settings.fields.created_at" showTime />
      <DateField source="updated_at" label="resources.system/settings.fields.updated_at" showTime />
    </Datagrid>
  </List>
);

// 筛选器
const settingsFilters = [
  <TextInput label="resources.system/settings.fields.type" source="type" alwaysOn />,
  <TextInput label="resources.system/settings.filters.name" source="name" />,
];

// 系统设置编辑
export const SystemSettingsEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <SelectInput
        source="type"
        label="resources.system/settings.fields.type"
        required
        choices={[
          { id: 'system', name: 'resources.system/settings.types.system' },
          { id: 'radius', name: 'resources.system/settings.types.radius' },
          { id: 'security', name: 'resources.system/settings.types.security' },
          { id: 'network', name: 'resources.system/settings.types.network' },
          { id: 'email', name: 'resources.system/settings.types.email' },
          { id: 'other', name: 'resources.system/settings.types.other' },
        ]}
      />
      <TextInput source="name" label="resources.system/settings.fields.name" required />
      <TextInput source="value" label="resources.system/settings.fields.value" required multiline rows={3} />
      <NumberInput source="sort" label="resources.system/settings.fields.sort" defaultValue={0} />
      <TextInput source="remark" label="resources.system/settings.fields.remark" multiline rows={2} />
    </SimpleForm>
  </Edit>
);

// 系统设置创建
export const SystemSettingsCreate = () => (
  <Create>
    <SimpleForm>
      <SelectInput
        source="type"
        label="resources.system/settings.fields.type"
        required
        defaultValue="system"
        choices={[
          { id: 'system', name: 'resources.system/settings.types.system' },
          { id: 'radius', name: 'resources.system/settings.types.radius' },
          { id: 'security', name: 'resources.system/settings.types.security' },
          { id: 'network', name: 'resources.system/settings.types.network' },
          { id: 'email', name: 'resources.system/settings.types.email' },
          { id: 'other', name: 'resources.system/settings.types.other' },
        ]}
      />
      <TextInput source="name" label="resources.system/settings.fields.name" required />
      <TextInput source="value" label="resources.system/settings.fields.value" required multiline rows={3} />
      <NumberInput source="sort" label="resources.system/settings.fields.sort" defaultValue={0} />
      <TextInput source="remark" label="resources.system/settings.fields.remark" multiline rows={2} />
    </SimpleForm>
  </Create>
);

// 系统设置详情
export const SystemSettingsShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField source="id" label="ID" />
      <TextField source="type" label="resources.system/settings.fields.type" />
      <TextField source="name" label="resources.system/settings.fields.name" />
      <TextField source="value" label="resources.system/settings.fields.value" />
      <TextField source="sort" label="resources.system/settings.fields.sort" />
      <TextField source="remark" label="resources.system/settings.fields.remark" />
      <DateField source="created_at" label="resources.system/settings.fields.created_at" showTime />
      <DateField source="updated_at" label="resources.system/settings.fields.updated_at" showTime />
    </SimpleShowLayout>
  </Show>
);
