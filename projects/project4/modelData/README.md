# CS142 Project4 Model Data

Since we don't have a backend database system to fetch model data from yet we stuff the model
data into the DOM so it will be accessible to the views.  We add an object
property named `cs142models` to the DOM that contains the model data for the different views.

* `cs142models.exampleModel()` - The model for the problem 1 - example view.
* `cs142models.statesModel()`  - The model for the problem 2 - states view.

These models can be accessed from the React controller of the view under the window property.
For example:

    window.cs142models.statesModel()
    
will access the problem2 states array so:

    window.cs142models.statesModel()[0] === 'Alabama'
