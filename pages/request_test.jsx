import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Head from "next/head";
import { useCurrentUser } from "@/hooks/index";

class RequestTest extends Component {
  render() {
    return (
      <>
        <div> Hello Request Page </div>
      </>
    );
  }
}

export default RequestTest;
