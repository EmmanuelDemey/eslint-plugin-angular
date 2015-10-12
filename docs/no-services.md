# no-services

Some services should be used only in a specific AngularJS service (Ajax-based service for example), in order to follow the separation of concerns paradigm.
The second parameter specifies the services.
The third parameter can be a list of angular objects (controller, factory, etc.).
Or second parameter can be an object, where keys are angular object names and value is a list of services (like {controller: ['$http'], factory: ['$q']})
