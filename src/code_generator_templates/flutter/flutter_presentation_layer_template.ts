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
    const template = `class ${featureClassName}PageStateMachine extends StateMachine<State?, Event> {
        ${featureClassName}PageStateMachine() : super(${featureClassName}PageInitializationState());
      
        @override
        State? getStateOnEvent(Event event) {
          // State? newState;
          // switch (event.runtimeType) {
          // }
          //return newState;
          throw UnimplementedError();
        }
      }
      
      class ${featureClassName}State {}
      
      class ${featureClassName}PageInitializationState extends ${featureClassName}State {}
      
      class ${featureClassName}Event {}`;

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
      final currentState = controller.getCurrentState();
      final currentStateType = controller.getCurrentState().runtimeType;
      UtilitiesWrapper.print(
          "buildDesktopView called with state $currentStateType",
          name: '${featureClassName}Page');

      switch (currentStateType) {
        case ${featureClassName}PageInitializationState:
          // return buildInitializationStateViewWeb();
          throw UnimplementedError();
      }
      throw Exception("Unrecognized state $currentStateType encountered");
    });
    
    @override
    Widget get mobileView => ControlledWidgetBuilder<${featureClassName}PageController>(
        builder: (context, controller) {
      final currentState = controller.getCurrentState();
      final currentStateType = controller.getCurrentState().runtimeType;
      UtilitiesWrapper.print(
          "buildMobileView called with state $currentStateType",
          name: '${featureClassName}Page');

      switch (currentStateType) {
        case ${featureClassName}PageInitializationState:
          // return buildInitializationStateViewMobile();
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