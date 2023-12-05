"use client";
import { getLocaleDictFromString } from "@/utils/getLocale";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { Container, Form, Nav, NavDropdown, Navbar } from "react-bootstrap";

export default function SearchBar() {
  const [searchString, setSearchString] = useState("");
  const [dict,setDict]=useState(getLocaleDictFromString(useRouter().locales?.[0]))
  return (
    <div className="justify-content-center w-100">
      <form
        className="row g-0"
        onSubmit={(e)=>handleSearch(searchString)}
      >
        <div className="col">
          <input
            className="form-control form-control-lg form-control-borderless"
            type="search"
            value={searchString}
            onChange={(e)=>setSearchString(e.target.value)}
            placeholder="Enter a product"
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-lg" type="submit">
            🔎︎
          </button>
        </div>
      </form>
    </div>
  );
}
function handleSearch(searchString:string){

}
