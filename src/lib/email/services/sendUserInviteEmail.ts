import type { Organization, User } from "@prisma/client";
import { sendEmail } from "../emailHelpers/sendEmail";

export const sendUserInviteEmail = async (email: string, inviteLink: string, user: User, org: Organization) => {
  const text = `
    # Knovolo

    # Welcome to Knovolo

    Hello,

    You have been invited to join ${org} on Knovolo. To complete your account setup, please set your password by clicking the button below:

    $${inviteLink}

    This invitation will expire in 7 days. If you have any questions, please contact your administrator.

    Best regards,
    The Knovolo Team

    © 2025 Knovolo. All rights reserved.

    If you didn't request this invitation, please ignore this email.
  `;

  const html = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
  lang="en"
>
  <head>
    <title></title>
    <meta charset="UTF-8" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <!--[if !mso]>-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->
    <meta name="x-apple-disable-message-reformatting" content="" />
    <meta content="target-densitydpi=device-dpi" name="viewport" />
    <meta content="true" name="HandheldFriendly" />
    <meta content="width=device-width" name="viewport" />
    <meta
      name="format-detection"
      content="telephone=no, date=no, address=no, email=no, url=no"
    />
    <style type="text/css">
      table {
        border-collapse: separate;
        table-layout: fixed;
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      table td {
        border-collapse: collapse;
      }
      .ExternalClass {
        width: 100%;
      }
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
        line-height: 100%;
      }
      body,
      a,
      li,
      p,
      h1,
      h2,
      h3 {
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
      }
      html {
        -webkit-text-size-adjust: none !important;
      }
      body,
      #innerTable {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      #innerTable img + div {
        display: none;
        display: none !important;
      }
      img {
        margin: 0;
        padding: 0;
        -ms-interpolation-mode: bicubic;
      }
      h1,
      h2,
      h3,
      p,
      a {
        line-height: inherit;
        overflow-wrap: normal;
        white-space: normal;
        word-break: break-word;
      }
      a {
        text-decoration: none;
      }
      h1,
      h2,
      h3,
      p {
        min-width: 100% !important;
        width: 100% !important;
        max-width: 100% !important;
        display: inline-block !important;
        border: 0;
        padding: 0;
        margin: 0;
      }
      a[x-apple-data-detectors] {
        color: inherit !important;
        text-decoration: none !important;
        font-size: inherit !important;
        font-family: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
      }
      u + #body a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
      }
      a[href^="mailto"],
      a[href^="tel"],
      a[href^="sms"] {
        color: inherit;
        text-decoration: none;
      }
    </style>
    <style type="text/css">
      @media (min-width: 481px) {
        .hd {
          display: none !important;
        }
      }
    </style>
    <style type="text/css">
      @media (max-width: 480px) {
        .hm {
          display: none !important;
        }
      }
    </style>
    <style type="text/css">
      @media (max-width: 480px) {
        .t4,
        .t8 {
          vertical-align: middle !important;
        }
        .t13,
        .t61,
        .t77 {
          padding-left: 20px !important;
          padding-right: 20px !important;
        }
        .t9 {
          text-align: left !important;
        }
        .t2 {
          display: revert !important;
        }
        .t4 {
          width: 123px !important;
        }
        .t8 {
          width: 600px !important;
        }
      }
    </style>
    <!--[if !mso]>-->
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&amp;family=Inter+Tight:wght@400;500;700&amp;display=swap"
      rel="stylesheet"
      type="text/css"
    />
    <!--<![endif]-->
    <!--[if mso]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
  </head>
  <body
    id="body"
    class="t83"
    style="
      min-width: 100%;
      margin: 0px;
      padding: 0px;
      background-color: #ffffff;
    "
  >
    <div class="t82" style="background-color: #ffffff">
      <table
        role="presentation"
        width="100%"
        cellpadding="0"
        cellspacing="0"
        border="0"
        align="center"
      >
        <tr>
          <td
            class="t81"
            style="
              font-size: 0;
              line-height: 0;
              mso-line-height-rule: exactly;
              background-color: #ffffff;
            "
            valign="top"
            align="center"
          >
            <!--[if mso]>
              <v:background
                xmlns:v="urn:schemas-microsoft-com:vml"
                fill="true"
                stroke="false"
              >
                <v:fill color="#FFFFFF" />
              </v:background>
            <![endif]-->
            <table
              role="presentation"
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              align="center"
              id="innerTable"
            >
              <tr>
                <td align="center">
                  <table
                    class="t16"
                    role="presentation"
                    cellpadding="0"
                    cellspacing="0"
                    style="margin-left: auto; margin-right: auto"
                  >
                    <tr>
                      <td width="550" class="t15" style="width: 550px">
                        <table
                          class="t14"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="width: 100%"
                        >
                          <tr>
                            <td class="t13" style="padding: 20px 0 20px 0">
                              <div
                                class="t12"
                                style="width: 100%; text-align: left"
                              >
                                <div class="t11" style="display: inline-block">
                                  <table
                                    class="t10"
                                    role="presentation"
                                    cellpadding="0"
                                    cellspacing="0"
                                    align="left"
                                    valign="middle"
                                  >
                                    <tr class="t9">
                                      <td></td>
                                      <td
                                        class="t4"
                                        width="63.13756"
                                        valign="middle"
                                      >
                                        <table
                                          role="presentation"
                                          width="100%"
                                          cellpadding="0"
                                          cellspacing="0"
                                          class="t3"
                                          style="width: 100%"
                                        >
                                          <tr>
                                            <td class="t1">
                                              <div style="font-size: 0px">
                                                <img
                                                  class="t0"
                                                  style="
                                                    display: block;
                                                    border: 0;
                                                    height: auto;
                                                    width: 100%;
                                                    margin: 0;
                                                    max-width: 100%;
                                                  "
                                                  width="38.13755795981453"
                                                  height="38.125"
                                                  alt=""
                                                  src="https://884bb87c-23cb-446b-9592-ce62d0bba091.b-cdn.net/e/d3faac16-1bd9-4dbf-8b7a-e6bcc84da2a5/cb994fa0-ee85-4528-a20b-6af14767e05d.png"
                                                />
                                              </div>
                                            </td>
                                            <td
                                              class="t2"
                                              style="width: 25px"
                                              width="25"
                                            ></td>
                                          </tr>
                                        </table>
                                      </td>
                                      <td
                                        class="t8"
                                        width="486.86244"
                                        valign="middle"
                                      >
                                        <table
                                          role="presentation"
                                          width="100%"
                                          cellpadding="0"
                                          cellspacing="0"
                                          class="t7"
                                          style="width: 100%"
                                        >
                                          <tr>
                                            <td class="t6">
                                              <h1
                                                class="t5"
                                                style="
                                                  margin: 0;
                                                  margin: 0;
                                                  font-family:
                                                    Inter,
                                                    BlinkMacSystemFont,
                                                    Segoe UI,
                                                    Helvetica Neue,
                                                    Arial,
                                                    sans-serif;
                                                  line-height: 34px;
                                                  font-weight: 400;
                                                  font-style: normal;
                                                  font-size: 28px;
                                                  text-decoration: none;
                                                  text-transform: none;
                                                  direction: ltr;
                                                  color: #333333;
                                                  text-align: left;
                                                  mso-line-height-rule: exactly;
                                                  mso-text-raise: 2px;
                                                "
                                              >
                                                Knovolo
                                              </h1>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                      <td></td>
                                    </tr>
                                  </table>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <div
                    class="t60"
                    style="
                      mso-line-height-rule: exactly;
                      mso-line-height-alt: 60px;
                      line-height: 60px;
                      font-size: 1px;
                      display: block;
                    "
                  >
                    &nbsp;&nbsp;
                  </div>
                </td>
              </tr>
              <tr>
                <td align="center">
                  <table
                    class="t64"
                    role="presentation"
                    cellpadding="0"
                    cellspacing="0"
                    style="margin-left: auto; margin-right: auto"
                  >
                    <tr>
                      <td width="550" class="t63" style="width: 550px">
                        <table
                          class="t62"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="width: 100%"
                        >
                          <tr>
                            <td class="t61">
                              <table
                                role="presentation"
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                style="width: 100% !important"
                              >
                                <tr>
                                  <td align="left">
                                    <table
                                      class="t21"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="margin-right: auto"
                                    >
                                      <tr>
                                        <td
                                          width="550"
                                          class="t20"
                                          style="width: 800px"
                                        >
                                          <table
                                            class="t19"
                                            role="presentation"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="width: 100%"
                                          >
                                            <tr>
                                              <td class="t18">
                                                <h1
                                                  class="t17"
                                                  style="
                                                    margin: 0;
                                                    margin: 0;
                                                    font-family:
                                                      Inter,
                                                      BlinkMacSystemFont,
                                                      Segoe UI,
                                                      Helvetica Neue,
                                                      Arial,
                                                      sans-serif;
                                                    line-height: 34px;
                                                    font-weight: 700;
                                                    font-style: normal;
                                                    font-size: 24px;
                                                    text-decoration: none;
                                                    text-transform: none;
                                                    direction: ltr;
                                                    color: #222222;
                                                    text-align: left;
                                                    mso-line-height-rule: exactly;
                                                    mso-text-raise: 3px;
                                                  "
                                                >
                                                  Welcome to Knovolo
                                                </h1>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div
                                      class="t22"
                                      style="
                                        mso-line-height-rule: exactly;
                                        mso-line-height-alt: 20px;
                                        line-height: 20px;
                                        font-size: 1px;
                                        display: block;
                                      "
                                    >
                                      &nbsp;&nbsp;
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left">
                                    <table
                                      class="t27"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="margin-right: auto"
                                    >
                                      <tr>
                                        <td
                                          width="550"
                                          class="t26"
                                          style="width: 800px"
                                        >
                                          <table
                                            class="t25"
                                            role="presentation"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="width: 100%"
                                          >
                                            <tr>
                                              <td class="t24">
                                                <p
                                                  class="t23"
                                                  style="
                                                    margin: 0;
                                                    margin: 0;
                                                    font-family:
                                                      Inter Tight,
                                                      BlinkMacSystemFont,
                                                      Segoe UI,
                                                      Helvetica Neue,
                                                      Arial,
                                                      sans-serif;
                                                    line-height: 28px;
                                                    font-weight: 500;
                                                    font-style: normal;
                                                    font-size: 18px;
                                                    text-decoration: none;
                                                    text-transform: none;
                                                    direction: ltr;
                                                    color: #000000;
                                                    text-align: left;
                                                    mso-line-height-rule: exactly;
                                                    mso-text-raise: 3px;
                                                  "
                                                >
                                                  Hello,
                                                </p>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div
                                      class="t28"
                                      style="
                                        mso-line-height-rule: exactly;
                                        mso-line-height-alt: 10px;
                                        line-height: 10px;
                                        font-size: 1px;
                                        display: block;
                                      "
                                    >
                                      &nbsp;&nbsp;
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left">
                                    <table
                                      class="t33"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="margin-right: auto"
                                    >
                                      <tr>
                                        <td
                                          width="550"
                                          class="t32"
                                          style="width: 800px"
                                        >
                                          <table
                                            class="t31"
                                            role="presentation"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="width: 100%"
                                          >
                                            <tr>
                                              <td class="t30">
                                                <p
                                                  class="t29"
                                                  style="
                                                    margin: 0;
                                                    margin: 0;
                                                    font-family:
                                                      Inter Tight,
                                                      BlinkMacSystemFont,
                                                      Segoe UI,
                                                      Helvetica Neue,
                                                      Arial,
                                                      sans-serif;
                                                    line-height: 28px;
                                                    font-weight: 500;
                                                    font-style: normal;
                                                    font-size: 18px;
                                                    text-decoration: none;
                                                    text-transform: none;
                                                    direction: ltr;
                                                    color: #000000;
                                                    text-align: left;
                                                    mso-line-height-rule: exactly;
                                                    mso-text-raise: 3px;
                                                  "
                                                >
                                                  You have been invited to join ${org} on Knovolo. To complete your account setup, please set your password by clicking the button below:
                                                </p>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div
                                      class="t34"
                                      style="
                                        mso-line-height-rule: exactly;
                                        mso-line-height-alt: 20px;
                                        line-height: 20px;
                                        font-size: 1px;
                                        display: block;
                                      "
                                    >
                                      &nbsp;&nbsp;
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div
                                      class="t36"
                                      style="
                                        mso-line-height-rule: exactly;
                                        mso-line-height-alt: 20px;
                                        line-height: 20px;
                                        font-size: 1px;
                                        display: block;
                                      "
                                    >
                                      &nbsp;&nbsp;
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center">
                                    <table
                                      class="t40"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="
                                        margin-left: auto;
                                        margin-right: auto;
                                      "
                                    >
                                      <tr>
                                        <td
                                          width="186"
                                          class="t39"
                                          style="
                                            background-color: #000000;
                                            overflow: hidden;
                                            width: 186px;
                                            border-radius: 8px 8px 8px 8px;
                                          "
                                        >
                                          <table
                                            class="t38"
                                            role="presentation"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="width: 100%"
                                          >
                                            <tr>
                                              <td
                                                class="t37"
                                                style="
                                                  text-align: center;
                                                  line-height: 46px;
                                                  mso-line-height-rule: exactly;
                                                  mso-text-raise: 9px;
                                                "
                                              >
                                                <a
                                                  class="t35"
                                                  href=${inviteLink}
                                                  style="
                                                    display: block;
                                                    margin: 0;
                                                    margin: 0;
                                                    font-family:
                                                      Inter Tight,
                                                      BlinkMacSystemFont,
                                                      Segoe UI,
                                                      Helvetica Neue,
                                                      Arial,
                                                      sans-serif;
                                                    line-height: 46px;
                                                    font-weight: 700;
                                                    font-style: normal;
                                                    font-size: 16px;
                                                    text-decoration: none;
                                                    direction: ltr;
                                                    color: #ffffff;
                                                    text-align: center;
                                                    mso-line-height-rule: exactly;
                                                    mso-text-raise: 9px;
                                                  "
                                                  target="_blank"
                                                  >Set your Password</a
                                                >
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div
                                      class="t41"
                                      style="
                                        mso-line-height-rule: exactly;
                                        mso-line-height-alt: 20px;
                                        line-height: 20px;
                                        font-size: 1px;
                                        display: block;
                                      "
                                    >
                                      &nbsp;&nbsp;
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div
                                      class="t43"
                                      style="
                                        mso-line-height-rule: exactly;
                                        mso-line-height-alt: 20px;
                                        line-height: 20px;
                                        font-size: 1px;
                                        display: block;
                                      "
                                    >
                                      &nbsp;&nbsp;
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left">
                                    <table
                                      class="t47"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="margin-right: auto"
                                    >
                                      <tr>
                                        <td
                                          width="550"
                                          class="t46"
                                          style="width: 800px"
                                        >
                                          <table
                                            class="t45"
                                            role="presentation"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="width: 100%"
                                          >
                                            <tr>
                                              <td class="t44">
                                                <p
                                                  class="t42"
                                                  style="
                                                    margin: 0;
                                                    margin: 0;
                                                    font-family:
                                                      Inter Tight,
                                                      BlinkMacSystemFont,
                                                      Segoe UI,
                                                      Helvetica Neue,
                                                      Arial,
                                                      sans-serif;
                                                    line-height: 28px;
                                                    font-weight: 500;
                                                    font-style: normal;
                                                    font-size: 18px;
                                                    text-decoration: none;
                                                    text-transform: none;
                                                    direction: ltr;
                                                    color: #000000;
                                                    text-align: left;
                                                    mso-line-height-rule: exactly;
                                                    mso-text-raise: 3px;
                                                  "
                                                >
                                                  This invitation will expire in 7 days. If you have any questions, please contact your administrator.
                                                </p>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>                                
                                <tr>
                                  <td>
                                    <div
                                      class="t55"
                                      style="
                                        mso-line-height-rule: exactly;
                                        mso-line-height-alt: 10px;
                                        line-height: 10px;
                                        font-size: 1px;
                                        display: block;
                                      "
                                    >
                                      &nbsp;&nbsp;
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="left">
                                    <table
                                      class="t59"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="margin-right: auto"
                                    >
                                      <tr>
                                        <td
                                          width="550"
                                          class="t58"
                                          style="width: 800px"
                                        >
                                          <table
                                            class="t57"
                                            role="presentation"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="width: 100%"
                                          >
                                            <tr>
                                              <td class="t56">
                                                <p
                                                  class="t54"
                                                  style="
                                                    margin: 0;
                                                    margin: 0;
                                                    font-family:
                                                      Inter Tight,
                                                      BlinkMacSystemFont,
                                                      Segoe UI,
                                                      Helvetica Neue,
                                                      Arial,
                                                      sans-serif;
                                                    line-height: 28px;
                                                    font-weight: 500;
                                                    font-style: normal;
                                                    font-size: 18px;
                                                    text-decoration: none;
                                                    text-transform: none;
                                                    direction: ltr;
                                                    color: #000000;
                                                    text-align: left;
                                                    mso-line-height-rule: exactly;
                                                    mso-text-raise: 3px;
                                                  "
                                                >
                                                  Best regards,<br />The Knovolo
                                                  Team
                                                </p>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td>
                  <div
                    class="t65"
                    style="
                      mso-line-height-rule: exactly;
                      mso-line-height-alt: 60px;
                      line-height: 60px;
                      font-size: 1px;
                      display: block;
                    "
                  >
                    &nbsp;&nbsp;
                  </div>
                </td>
              </tr>
              <tr>
                <td align="center">
                  <table
                    class="t80"
                    role="presentation"
                    cellpadding="0"
                    cellspacing="0"
                    style="margin-left: auto; margin-right: auto"
                  >
                    <tr>
                      <td
                        width="550"
                        class="t79"
                        style="
                          background-color: #f9f9f9;
                          border-top: 1px solid #ebebeb;
                          width: 550px;
                        "
                      >
                        <table
                          class="t78"
                          role="presentation"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          style="width: 100%"
                        >
                          <tr>
                            <td class="t77" style="padding: 30px 0 30px 0">
                              <table
                                role="presentation"
                                width="100%"
                                cellpadding="0"
                                cellspacing="0"
                                style="width: 100% !important"
                              >
                                <tr>
                                  <td align="center">
                                    <table
                                      class="t70"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="
                                        margin-left: auto;
                                        margin-right: auto;
                                      "
                                    >
                                      <tr>
                                        <td
                                          width="550"
                                          class="t69"
                                          style="width: 600px"
                                        >
                                          <table
                                            class="t68"
                                            role="presentation"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="width: 100%"
                                          >
                                            <tr>
                                              <td class="t67">
                                                <p
                                                  class="t66"
                                                  style="
                                                    margin: 0;
                                                    margin: 0;
                                                    font-family:
                                                      Inter Tight,
                                                      BlinkMacSystemFont,
                                                      Segoe UI,
                                                      Helvetica Neue,
                                                      Arial,
                                                      sans-serif;
                                                    line-height: 22px;
                                                    font-weight: 400;
                                                    font-style: normal;
                                                    font-size: 16px;
                                                    text-decoration: none;
                                                    text-transform: none;
                                                    direction: ltr;
                                                    color: #686868;
                                                    text-align: center;
                                                    mso-line-height-rule: exactly;
                                                    mso-text-raise: 2px;
                                                  "
                                                >
                                                  © 2025 Knovolo. All rights
                                                  reserved.
                                                </p>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div
                                      class="t72"
                                      style="
                                        mso-line-height-rule: exactly;
                                        mso-line-height-alt: 15px;
                                        line-height: 15px;
                                        font-size: 1px;
                                        display: block;
                                      "
                                    >
                                      &nbsp;&nbsp;
                                    </div>
                                  </td>
                                </tr>
                                <tr>
                                  <td align="center">
                                    <table
                                      class="t76"
                                      role="presentation"
                                      cellpadding="0"
                                      cellspacing="0"
                                      style="
                                        margin-left: auto;
                                        margin-right: auto;
                                      "
                                    >
                                      <tr>
                                        <td
                                          width="550"
                                          class="t75"
                                          style="width: 600px"
                                        >
                                          <table
                                            class="t74"
                                            role="presentation"
                                            cellpadding="0"
                                            cellspacing="0"
                                            width="100%"
                                            style="width: 100%"
                                          >
                                            <tr>
                                              <td class="t73">
                                                <p
                                                  class="t71"
                                                  style="
                                                    margin: 0;
                                                    margin: 0;
                                                    font-family:
                                                      Inter Tight,
                                                      BlinkMacSystemFont,
                                                      Segoe UI,
                                                      Helvetica Neue,
                                                      Arial,
                                                      sans-serif;
                                                    line-height: 22px;
                                                    font-weight: 400;
                                                    font-style: normal;
                                                    font-size: 16px;
                                                    text-decoration: none;
                                                    text-transform: none;
                                                    direction: ltr;
                                                    color: #686868;
                                                    text-align: center;
                                                    mso-line-height-rule: exactly;
                                                    mso-text-raise: 2px;
                                                  "
                                                >
                                                  If you didn&#39;t request this invitation, please ignore this email.                                                  
                                                </p>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
    <div
      class="gmail-fix"
      style="
        display: none;
        white-space: nowrap;
        font: 15px courier;
        line-height: 0;
      "
    >
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
    </div>
  </body>
  </html>
  `;

  return await sendEmail({to: email, subject: `You have been invited to join ${org} on Knovolo`, text, html, type: "userInvite", entity: user});
};