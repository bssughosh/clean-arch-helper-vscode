export function getFlutterDataLayerCodeTemplate(
    featureClassName: string,
    snakeCaseFeatureName: string,
): string {
    const template = `import '../../domain/repository/${snakeCaseFeatureName}_repository.dart';
        
class ${featureClassName}RepositoryImpl extends ${featureClassName}Repository {}`;

    return template;
};