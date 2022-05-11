# pip install streamlit
# streamlit hello
# streamlit run dashboard.py

import streamlit as st
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

x = st.slider('Select a value')
st.write(x, 'squared is', x * x)

DATE_COLUMN = 'date/time'
DATA_URL = ('https://s3-us-west-2.amazonaws.com/'
         'streamlit-demo-data/uber-raw-data-sep14.csv.gz')

@st.cache
def load_data(nrows):
    data = pd.read_csv(DATA_URL, nrows=nrows)
    lowercase = lambda x: str(x).lower()
    data.rename(lowercase, axis='columns', inplace=True)
    data[DATE_COLUMN] = pd.to_datetime(data[DATE_COLUMN])
    return data

# Create a text element and let the reader know the data is loading.
data_load_state = st.text('Loading data...')
# Load 10,000 rows of data into the dataframe.
data = load_data(10000)
# Notify the reader that the data was successfully loaded.
# data_load_state.text('Loading data...done!')
data_load_state.text("Done! (using st.cache)")

# raw data with checkbox
if st.checkbox('Show raw data'):
    st.subheader('Raw data')
    st.write(data)
# raw data without checkbox
# st.subheader('Raw data')
# st.write(data)

st.subheader('Data Head')
st.dataframe(data.head(5))

# Draw a histogram
st.subheader('Number of pickups by hour')
hist_values = np.histogram(
    data[DATE_COLUMN].dt.hour, bins=24, range=(0,24))[0]
st.bar_chart(hist_values)

# chart types: https://docs.streamlit.io/library/api-reference/charts
st.subheader('Matplotlib')
arr = np.random.normal(1, 1, size=100)
fig, ax = plt.subplots()
ax.hist(arr, bins=20)
st.pyplot(fig)

# plot data on a map
st.subheader('Map of all pickups')
st.map(data)

# updated maps
# hour_to_filter = 17
hour_to_filter = st.slider('hour', 0, 23, 17)  # min: 0h, max: 23h, default: 17h
filtered_data = data[data[DATE_COLUMN].dt.hour == hour_to_filter]
st.subheader(f'Map of all pickups at {hour_to_filter}:00')
st.map(filtered_data)



