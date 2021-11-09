import { DeviceType, FlutterState } from "../../utils/enums";

export function getFlutterPresenterCodeTemplate(featureClassName: string): string {
    const template = `import 'package:flutter_clean_architecture/flutter_clean_architecture.dart';

    class ${featureClassName}PagePresenter extends Presenter {
        ${featureClassName}PagePresenter();
    
      @override
      dispose() { }
    }`;

    return template;
};

export function getFlutterStateMachineCodeTemplate(featureClassName: string): string {
    const template = `class ${featureClassName}PageStateMachine extends StateMachine<${featureClassName}State?, ${featureClassName}Event> {
        ${featureClassName}PageStateMachine() : super(${featureClassName}PageInitializationState());
      
        @override
        ${featureClassName}State? getStateOnEvent(${featureClassName}Event event) {
          ${featureClassName}State? newState;
          switch (event.runtimeType) {
            case ${featureClassName}PageInitializedEvent:
              newState = ${featureClassName}PageInitializedState();
              break;

            case ${featureClassName}PageLoadingEvent:
              newState = ${featureClassName}PageLoadingState();
              break;

            case ${featureClassName}PageErrorEvent:
              newState = ${featureClassName}PageErrorState();
              break;

          }
          return newState;
        }
      }
      
      class ${featureClassName}State {}
      
      class ${featureClassName}PageInitializationState extends ${featureClassName}State {}

      class ${featureClassName}PageInitializedState extends ${featureClassName}State {}

      class ${featureClassName}PageLoadingState extends ${featureClassName}State {}

      class ${featureClassName}PageErrorState extends ${featureClassName}State {}
      
      class ${featureClassName}Event {}
      
      class ${featureClassName}PageInitializedEvent extends ${featureClassName}Event {}

      class ${featureClassName}PageLoadingEvent extends ${featureClassName}Event {}

      class ${featureClassName}PageErrorEvent extends ${featureClassName}Event {}`;

    return template;
};

export function getFlutterControllerCodeTemplate(featureClassName: string, snakeCaseFeatureName: string): string {
    const template = `import 'package:flutter_clean_architecture/flutter_clean_architecture.dart';

    import '${snakeCaseFeatureName}_presenter.dart';
    import '${snakeCaseFeatureName}_state_machine.dart';

    class ${featureClassName}PageController extends Controller {
      final ${featureClassName}PagePresenter _presenter;
      final ${featureClassName}PageStateMachine _stateMachine = new ${featureClassName}PageStateMachine();
      // final _navigationService = serviceLocator<NavigationService>();
      ${featureClassName}PageController()
          : _presenter = serviceLocator<${featureClassName}PagePresenter>(),
           super();
    
      @override
      void initListeners() {}
    
      @override
      void onDisposed() {
        _presenter.dispose();
        super.onDisposed();
      }
    
      ${featureClassName}State getCurrentState() {
        return _stateMachine.getCurrentState()!;
      }
    }`;

    return template;
};

export function getFlutterViewCodeTemplate(featureClassName: string, snakeCaseFeatureName: string): string {
    const template = `import 'package:flutter/material.dart';
    import 'package:flutter_clean_architecture/flutter_clean_architecture.dart';

    import '${snakeCaseFeatureName}_controller.dart';
    import '${snakeCaseFeatureName}_state_machine.dart';

    class ${featureClassName}Page extends View {
    @override
    State<StatefulWidget> createState() => ${featureClassName}ViewState();
    }
    
    class ${featureClassName}ViewState extends ResponsiveViewState<${featureClassName}Page, ${featureClassName}PageController> {
    ${featureClassName}ViewState() : super(new ${featureClassName}PageController());
    
    @override
    Widget get desktopView => ControlledWidgetBuilder<${featureClassName}PageController>(
        builder: (context, controller) {
      // final currentState = controller.getCurrentState();
      final currentStateType = controller.getCurrentState().runtimeType;
      UtilitiesWrapper.print(
          "buildDesktopView called with state $currentStateType",
          name: '${featureClassName}Page');

      switch (currentStateType) {
        case ${featureClassName}PageInitializationState:
          // return buildInitializationStateViewWeb();
          throw UnimplementedError();

        case ${featureClassName}PageInitializedState:
          // return buildInitializedtateViewWeb();
          throw UnimplementedError();

        case ${featureClassName}PageLoadingState:
          // return buildLoadingStateViewWeb();
          throw UnimplementedError();

        case ${featureClassName}PageErrorState:
          // return buildErrorStateViewWeb();
          throw UnimplementedError();
      }
      throw Exception("Unrecognized state $currentStateType encountered");
    });
    
    @override
    Widget get mobileView => ControlledWidgetBuilder<${featureClassName}PageController>(
        builder: (context, controller) {
      // final currentState = controller.getCurrentState();
      final currentStateType = controller.getCurrentState().runtimeType;
      UtilitiesWrapper.print(
          "buildMobileView called with state $currentStateType",
          name: '${featureClassName}Page');

      switch (currentStateType) {
        case ${featureClassName}PageInitializationState:
          // return buildInitializationStateViewMobile();
          throw UnimplementedError();

        case ${featureClassName}PageInitializedState:
          // return buildInitializedtateViewMobile();
          throw UnimplementedError();

        case ${featureClassName}PageLoadingState:
          // return buildLoadingStateViewMobile();
          throw UnimplementedError();

        case ${featureClassName}PageErrorState:
          // return buildErrorStateViewMobile();
          throw UnimplementedError();
      }
      throw Exception("Unrecognized state $currentStateType encountered");
    });
    
    @override
    Widget get tabletView => mobileView;
    
    @override
    Widget get watchView => throw UnimplementedError();
    }`;

    return template;
};

export function getFlutterDeviceViewCodeTemplate(state: FlutterState, deviceType: DeviceType): string {
  const template = `import 'package:flutter/material.dart';

  Widget build${state}View${deviceType}() {
    throw UnimplementedError();
  }
  `;

  return template;
}
