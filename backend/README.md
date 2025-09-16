cd backend

# create a Python virtualenv
python3 -m venv venv
source venv/bin/activate   # (Windows: venv\Scripts\activate)

# install Django, DRF, PostgreSQL driver
pip install django djangorestframework psycopg2-binary python-decouple

# start Django project
django-admin startproject nexus .


