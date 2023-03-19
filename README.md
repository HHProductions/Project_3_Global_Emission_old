# Global Emission (2000-2020)

 As global warming becomes worse, by analysing this dataset we tried to attempt make visualization about each countries contribution in global warming. 

* Data Source

1) https://www.kaggle.com/datasets/justin2028/total-emissions-per-country-2000-2020
2)
 

* Dependancies:
1) Database : SQLite
2) Python 3.9 for Flask (API) 
3) JavaScript library : D3, plotly.js, chart.js, Leaflet.js

* API's created for visualization:
1) http://127.0.0.1:5000/api/v1.0/emissions
        The API serves emission data of all countries for years 2000 to 2020
2) http://127.0.0.1:5000/api/v1.0/emissions-items
        The API serves emission data of all countries for years 2000 to 2020 along with items contributing to emission for the respective country.


* Instructions: 
1)How to run API
  Execute app.py and app3.py from the root of the repository
     ```sh 
    python3 app.py
    pyhton3 app3.py
    ```