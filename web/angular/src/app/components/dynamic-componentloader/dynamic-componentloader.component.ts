import {Component, Input, ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver} from '@angular/core';


import { SupportStatusComponent } from 'app/widgets/system-inventory/support-status/support-status.component';
import { ProductTypeComponent } from 'app/widgets/system-inventory/product-type/product-type.component';
import { CapacityComponent } from 'app/widgets/auto-support/capacity/capacity.component';
import { SystemHealthComponent } from 'app/widgets/auto-support/system-health/system-health.component';
import { PerformanceComponent } from 'app/widgets/auto-support/performance/performance.component';
import { EfficiencyComponent } from 'app/widgets/auto-support/efficiency/efficiency.component';


@Component({
  selector: 'dynamic-component-loader',
  entryComponents: [SupportStatusComponent, ProductTypeComponent,CapacityComponent,
                    SystemHealthComponent,PerformanceComponent,EfficiencyComponent ], // Reference to the components must be here in order to dynamically create them
  template: `
    <div #dynamicComponentContainer></div>
  `,
})

export class DynamicComponentLoaderComponent {
  currentComponent = null;

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) dynamicComponentContainer: ViewContainerRef;
  
  // component: Class for the component you want to create
  // inputs: An object with key/value pairs mapped to input name/input value
  @Input() set componentData(data: {component: any, inputs: any }) {

    console.log('loading dynamiccontrol')
    if (!data) {
      console.log('dynamiccontrol no data')
      return;
    }

    console.log('loading dynamiccontrol')
    // Inputs need to be in the following format to be resolved properly
    let inputProviders = Object.keys(data.inputs).map((inputName) => {return {provide: inputName, useValue: data.inputs[inputName]};});
    let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
    
    // We create an injector out of the data we want to pass down and this components injector
    let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);
    
    // We create a factory out of the component we want to create
    let factory = this.resolver.resolveComponentFactory(data.component);
    
    // We create the component using the factory and the injector
    let component = factory.create(injector);
    
    // We insert the component into the dom container
    this.dynamicComponentContainer.insert(component.hostView);
    
    // We can destroy the old component is we like by calling destroy
    if (this.currentComponent) {
      this.currentComponent.destroy();
    }
    
    this.currentComponent = component;
  }
  
  constructor(private resolver: ComponentFactoryResolver) {    
  }
}
