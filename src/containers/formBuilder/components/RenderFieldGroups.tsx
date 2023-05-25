import { baseFieldMeta } from '../config/BaseFieldConfig';
import { IBaseFieldMeta } from '../types/BaseFieldMeta';
import { IComponentConfig } from '../types/ComponentConfig';
import { getConfigByViewType } from '../utils/FieldUtils';
import RenderFields from './RenderFields';

const RenderFieldGroups = ({
  obj,
  name,
  form,
  unAddedFields,
  targetIds,
  isNew,
  newlyAddedIds,
  handleUpdateFieldName,
  isAccountCustomization,
  hashFieldIdsWithTitle,
  hashFieldIdsWithFieldName
}: any) => {
  const componentConfig: IComponentConfig = getConfigByViewType(obj?.viewType);
  return (
    <>
      {Object.keys(obj)
        .sort(
          (fieldA: string, fieldB: string) =>
            (baseFieldMeta[fieldA as keyof IBaseFieldMeta]?.order || 0) -
            (baseFieldMeta[fieldB as keyof IBaseFieldMeta]?.order || 0)
        )
        .map((field) => {
          if (componentConfig.customizableFieldMeta.hasOwnProperty(field)) {
            const inputProps = {
              ...baseFieldMeta[field as keyof IBaseFieldMeta],
              ...componentConfig.customizableFieldMeta[field as keyof IBaseFieldMeta]
            };
            return (
              <RenderFields
                key={field}
                obj={obj}
                name={name}
                form={form}
                fieldName={field}
                inputProps={inputProps}
                unAddedFields={unAddedFields}
                targetIds={targetIds}
                isNew={isNew}
                newlyAddedIds={newlyAddedIds}
                handleUpdateFieldName={handleUpdateFieldName}
                isAccountCustomization={isAccountCustomization}
                hashFieldIdsWithTitle={hashFieldIdsWithTitle}
                hashFieldIdsWithFieldName={hashFieldIdsWithFieldName}
              />
            );
          } else {
            return null;
          }
        })}
    </>
  );
};

export default RenderFieldGroups;
