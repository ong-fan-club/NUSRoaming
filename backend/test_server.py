from fastapi import FastAPI
from fastapi.testclient import TestClient

from .server import app

client = TestClient(app)


# write tests for every endpoint
def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}


def test_search():
    response = client.get("/search?query=Kyoto")
    assert response.status_code == 200
    # assert length of response is non-zero
    assert len(response.json()) > 0
    # assert PDF-extracted fields are present
    assert "university_name" in response.json()[0]
    assert "university_website" in response.json()[0]
    assert "university_country" in response.json()[0]
    # assert GPT-extracted fields are present
    assert "gpt_university_description" in response.json()[0]
    assert "gpt_university_address" in response.json()[0]


def test_query():
    response = client.get("/query?query=select 123")
    assert response.status_code == 200
    print(response.json())
    assert response.json() == [{"123": 123}]


def test_mappings():
    response = client.get("/mappings/partner_uni/Monash University")
    assert response.status_code == 200
    # assert length of response is non-zero
    assert len(response.json()) > 0


def test_countries():
    response = client.get("/mappings/countries/Australia")
    assert response.status_code == 200
    # assert length of response is non-zero
    assert len(response.json()) > 0
    # assert fields are present
    assert "partner_uni" in response.json()[0]
    # assert that Monash University is in the response
    assert "Monash University" in [x["partner_uni"] for x in response.json()]


def test_universities():
    response = client.get("/partner_unis/partner_uni/University of Sydney")
    assert response.status_code == 200
    # assert length of response is non-zero
    assert len(response.json()) > 0
    # assert PDF-extracted fields are present
    assert "university_name" in response.json()[0]
    assert "university_website" in response.json()[0]
    assert "university_country" in response.json()[0]
    # assert GPT-extracted fields are present
    assert "gpt_university_description" in response.json()[0]
    assert "gpt_university_address" in response.json()[0]


def test_universities_group_by_first_letter():
    response = client.get("/partner_unis/group_by_first_letter")
    assert response.status_code == 200
    # assert length of response is non-zero
    assert len(response.json()) > 0
    # assert correct format
    assert "university_names" in response.json()[0]
    assert "first_letter" in response.json()[0]
    # assert that Alberta University is in the first bucket
    # assert that all universities in the first bucket start with A
    assert all([x.startswith("A") for x in response.json()[0]["university_names"]])
