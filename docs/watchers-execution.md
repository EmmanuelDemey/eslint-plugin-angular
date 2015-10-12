# watchers-execution

For the execution of the watchers, the $digest method will start from the scope in which we call the method.
This will cause an performance improvement comparing to the $apply method, who start from the $rootScope
