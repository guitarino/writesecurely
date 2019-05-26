import { h, Component, AnyComponent, ComponentConstructor } from "preact";
import { Type } from "typeinject/type.types";
import { Omit } from "../../../types/Omit";
import { configureDependency } from "../../../type/inject";
import { connect } from "typeconnect";

type MapInstanceToProps<Interface, Props> = (instance: Interface) => {
    [p in keyof Props]: any
}

type Dependency<Interface, Props> = {
    type: Type<Interface>,
    mapInstanceToProps: MapInstanceToProps<Interface, Props>
}

type Instance<Interface = any, Props = any> = {
    instance: Interface,
    mapInstanceToProps: MapInstanceToProps<Interface, Props>
}

export function connectComponent() {
    const dependencies: Array<Dependency<any, any>> = [];

    function connector<AdditionalProps>() {
        return {
            with<Interface, Props>(
                type: Type<Interface>,
                mapInstanceToProps: MapInstanceToProps<Interface, Props>
            ) {
                dependencies.push({
                    type,
                    mapInstanceToProps
                });
                return connector<AdditionalProps & Props>();
            },

            create<Props extends AdditionalProps>(UserComponent: AnyComponent<Props>): ComponentConstructor<Omit<Props, keyof AdditionalProps>, AdditionalProps> {
                return configureDependency()
                    .inject(...dependencies.map(dependency => dependency.type))
                    .create(
                        class extends Component<Props, AdditionalProps> {
                            constructor(...args) {
                                const instanceArgs = args.slice(0, dependencies.length);
                                const componentArguments = args.slice(dependencies.length);
                                super(...componentArguments);
                                new InjectedProperties(this, instanceArgs.map((instance, i) => ({
                                    instance,
                                    mapInstanceToProps: dependencies[i].mapInstanceToProps
                                })))
                            }
                            
                            render() {
                                return <UserComponent {...this.props} {...this.state} />;
                            }
                        }
                    )
                ;
            }
        }
    }

    return connector();
}

const InjectedProperties = connect(class {
    private readonly componentInstance: Component;
    private readonly instances: Array<Instance>;

    constructor(componentInstance: Component, instances: Array<Instance>) {
        this.componentInstance = componentInstance;
        this.instances = instances;
    }

    setState() {
        let additionalProps = {};
        this.instances.forEach(instance => {
            additionalProps = {
                ...additionalProps,
                ...instance.mapInstanceToProps(instance.instance)
            };
        });
        this.componentInstance.setState(additionalProps);
    }
});