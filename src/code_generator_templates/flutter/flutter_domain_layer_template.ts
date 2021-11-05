export function getFlutterDomainLayerCodeTemplate(featureClassName: string): string {
    const template = `abstract class ${featureClassName}Repository {}`;

    return template;
};