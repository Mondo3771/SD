import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import LandingNew from "./LandingNew";
import {get} from "./LandingNew";
fetchMock.enableMocks();
it("gets data from the server", async () => {
    const data = {
        email: "",
        sub: "",
        given_name: "",
        family_name: "",
    };
    const setLoaded = jest.fn();
    const history = createMemoryHistory();

    fetchMock.mockResponseOnce(JSON.stringify("Success"));
    const post = await get(data,setLoaded);
    expect(post).toEqual("Success");
});