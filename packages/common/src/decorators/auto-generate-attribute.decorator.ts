import {MetadataManager} from '../metadata/metadata-manager';
import {AutoGenerateAttributeRawMetadataOptions} from '../metadata/metadata-storage';

export function AutoGenerateAttribute(
  options: Pick<
    AutoGenerateAttributeRawMetadataOptions,
    'strategy' | 'autoUpdate'
  >
): PropertyDecorator {
  return (target, propertyKey) => {
    const type = Reflect.getMetadata('design:type', target, propertyKey);

    const attributeProps: AutoGenerateAttributeRawMetadataOptions = {
      name: propertyKey.toString(),
      type: type.name,
      strategy: options.strategy,
      // this does not make a lot of sense atm, as all supported auto generate strategy are likely to be unique
      // but can be useful in cases where we support auto generating value by user input
      autoUpdate: options.autoUpdate,
    };

    if (options.strategy)
      MetadataManager.metadataStorage.addRawAttribute(
        target.constructor,
        attributeProps
      );
  };
}
