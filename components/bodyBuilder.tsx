// @ts-nocheck

"use client";
// @ts-nocheck

import { TabsTrigger, TabsList, Tabs, TabsContent } from "@/components/ui/tabs";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { CardContent, Card, CardTitle, CardDescription, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

let data = {
  common_params: [
    "key",
    "txnid",
    "productinfo",
    "amount",
    "firstname",
    "email",
    "phone",
    "surl",
    "hash",
  ],
  flow: {
    non_seamless: {
      types: ["cards", "nb", "wallets", "upi", "emi"],
      common_params: [],
      cards_nb_cash_upi_emi_bnpl: {
        common_params: [],
        use_cases: {
          guest_checkout: [],
          guest_checkout_with_tokenization: ["user_credentials"],
          standing_instruction: ["si", "si_details"],
        },
      },
    },
    seamless: {
      common_params: ["pg", "bankcode"],
      cards: {
        common_params: ["ccnum", "ccexpmon", "ccexpyr", "ccname", "ccvv"],
        use_cases: {
          guest_checkout_plain_card: [],
          guest_checkout_tokenization: ["user_credentials", "store_card"],
        },
      },
    },
    s2s: {},seamless1: {
      common_params: ["pg", "bankcode"],
      cards: {
        common_params: ["ccnum", "ccexpmon", "ccexpyr", "ccname", "ccvv"],
        use_cases: {
          guest_checkout_plain_card: [],
          guest_checkout_tokenization: ["user_credentials", "store_card"],
        },
      },
    },seamless2: {
      common_params: ["pg", "bankcode"],
      cards: {
        common_params: ["ccnum", "ccexpmon", "ccexpyr", "ccname", "ccvv"],
        use_cases: {
          guest_checkout_plain_card: [],
          guest_checkout_tokenization: ["user_credentials", "store_card"],
        },
      },
    },
  },
};

let paramMapping = {
  key: {
    description:
      "This parameter is the unique merchant key provided by PayU for your merchant account. For more information, refer to Generate Merchant Key and Salt.",
    example: "8488225",
  },
  txnid: {
    description:
      "This parameter is known as Transaction ID (or OrderID). It is the order reference number generated at your (Merchant’s) end. It is an identifier which you(merchant) would use to track a particular order. If a transaction using a particular transaction ID has already been successful at PayU, the usage of same Transaction ID again would fail. Hence, it is essential that you post us a unique transaction ID for every new transaction (Please make sure that the transaction ID being sent to us hasn’t been successful earlier. In case of this duplication, the customer would get an error of ‘duplicate Order ID’).",
    example: "fd3e847h2",
  },
  amount: {
    description:
      "This parameter should contain the payment amount of the particular transaction. Note: Type-cast the amount to float type",
    example: "10",
  },
  productinfo: {
    description:
      "This parameter should contain a brief product description. It should be a string describing the product (The description type is entirely your choice).",
    example: "T-shirt",
  },
  firstname: {
    description: "This parameter must contain the first name of the customer.",
    example: "Ankit",
  },
  email: {
    description: "This parameter must contain the email of the customer)",
    example: "test@gmail.com",
  },
  phone: {
    description:
      "Merchant needs to take the customer’s GPay registered phone number and pass in this field. This field will be used for further mapping the customer VPA and initiate a collect request.",
    example: "",
  },
  pg: {
    description:
      "This parameter contains the payment method to be enabled to collect payment from your customer. For the list of payment methods and their codes, refer to Payment Mode Codes. For Net Banking, use NB.",
    example: "NB",
  },
  bankcode: {
    description:
      "Each payment option is identified with a unique bank code at PayU. The merchant must post this parameter with the corresponding payment option’s bank code value in it. For the list of bankcodes for Net Banking, refer to Net Banking Codes.",
    example: "AXIB",
  },
  surl: {
    description:
      'The "surl" field is the success URL, which is the page PayU will redirect to if the transaction is successful. The merchant can handle the response at this URL after the customer is redirected there.',
    example: "https://apiplayground-response.herokuapp.com/",
  },
  furl: {
    description:
      'The "furl" field is the Failure URL, which is the page PayU will redirect to if the transaction is failed. The merchant can handle the response at this URL after the customer is redirected there.',
    example: "https://apiplayground-response.herokuapp.com/",
  },
  hash: {
    description:
      "The hash calculated by the merchant using the key and salt provided by PayU. The format for calculating the hash: sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT) For more information, refer to Generate Hash.",
    example: "",
  },
  lastname: {
    description: "The last name of the customer.",
    example: "",
  },
  address1: {
    description: "The first line of the billing address.",
    example: "",
  },
  address2: {
    description: "The second line of the billing address.",
    example: "",
  },
  city: {
    description:
      "The city where your customer resides as part of the billing address.",
    example: "",
  },
  state: {
    description:
      "The state where your customer resides as part of the billing address.",
    example: "",
  },
  country: {
    description: "The country where your customer resides.",
    example: "",
  },
  zipcode: {
    description:
      "Billing address zip code is mandatory for the cardless EMI option.",
    example: "",
  },
  udf1: {
    description:
      "This parameter has been made for you to keep any information corresponding to the transaction. Note: This parameter must contain buyer’s PAN number for Cross-Border Payments.",
    example: "",
  },
  udf2: {
    description:
      "This parameter has been made for you to keep any information corresponding to the transaction.",
    example: "",
  },
  udf3: {
    description:
      "This parameter has been made for you to keep any information corresponding to the transaction. Note: This parameter must contain buyer’s date of birth for Cross-Border Payments.",
    example: "",
  },
  udf4: {
    description:
      "This parameter has been made for you to keep any information corresponding to the transaction.",
    example: "",
  },
  udf5: {
    description:
      "This parameter has been made for you to keep any information corresponding to the transaction. Note: This parameter must contain invoice id/awb id of the transaction for Cross-Border Payments.",
    example: "",
  },
};

export default function Component() {
  let [selectedMethod, setSelectedMethod] = useState("");
  let [methods, setMethods] = useState([]);
  let [selectedFlow, setSelectedFlow] = useState("non_seamless");
  let [params, setParams] = useState([]);
  const handleRequestTypeChange = (requestType: string) => {
    console.log(requestType);
    const globalParams = data.common_params;
    const flowGlobalParams = data.flow[selectedFlow as keyof typeof data]?.common_params;
    const localGlobalParams =
      data.flow[selectedFlow][selectedMethod]?.common_params;
    const localParams =
      data.flow[selectedFlow][selectedMethod]?.use_cases[requestType];
    setParams([
      ...globalParams,
      ...flowGlobalParams,
      ...localGlobalParams,
      ...localParams,
    ]);
  };
  return (
    <Card className="h-screen p-4 flex flex-col md:flex-row">
      <CardContent className="sticky top-2 self-start">
        <div className="my-10 text-start text-gray-900 font-bold">Generate request payload </div>
        <Tabs defaultValue="non_seamless" className="">
          <TabsList className="flex space-x-4">
            {Object.keys(data.flow).map((value, index) => {
              return (
                <TabsTrigger
                  key={value}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                  value={value}
                  onClick={() => {
                    console.log(value);
                    setSelectedFlow(value);
                  }}
                >
                  {value}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {Object.keys(data.flow).map((value: string, index: number) => {
            return (
              <TabsContent value={value} key={value}>
                <Tabs className="bg-gray-100 dark:bg-gray-800 ">
                  <TabsList className="flex space-x-4">
                    {Object.keys(data.flow[value]).map((method, yIndex) => {
                      if (method == "common_params" || method == "types")
                        return;
                      return (
                        <TabsTrigger
                          key={method}
                          className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
                          value={method}
                          onClick={() => {
                            setSelectedMethod(method);
                            setMethods(
                              Object.keys(
                                data.flow[value][method]?.use_cases || []
                              )
                            );
                          }}
                        >
                          {method}
                        </TabsTrigger>
                      );
                    })}
                  </TabsList>
                </Tabs>
              </TabsContent>
            );
          })}

          <TabsContent value="cash">Change your password here.</TabsContent>
        </Tabs>
        <form className="mt-4">
          <fieldset className="mb-4 p-4 border rounded bg-white dark:bg-gray-800">
            <legend className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              Select request type
            </legend>
            <div className="flex items-center space-x-4">
              <RadioGroup defaultValue="">
                {methods.map((request, index) => {
                  return (
                    <div
                      key={request}
                      onClick={() => {
                        handleRequestTypeChange(request);
                      }}
                      className="flex items-center space-x-2"
                    >
                      <RadioGroupItem id={request} value={request} />
                      <Label
                        className="text-gray-700 dark:text-gray-300"
                        htmlFor={request}
                      >
                        {request}
                      </Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          </fieldset>
          {/* <fieldset className="mb-4 p-4 border rounded bg-white dark:bg-gray-800">
            <legend className="text-lg font-semibold text-gray-900 dark:text-gray-50">
              Optional and 3DS Fields
            </legend>
            <p className="mb-4 text-sm text-gray-700 dark:text-gray-400">
              To include 3DS fields, first select optional fields and then
              select a provider. Showing fields for a specific 3DS flow is
              disabled if that flow is not supported by either the provider or
              the selected request type.
            </p>
            <div className="flex flex-col space-y-2">
              <Checkbox id="optional_fields" />
              <label
                className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300"
                htmlFor="optional_fields"
              >
                Include optional fields in the output
              </label>
              <Checkbox id="show_3ds_paymentsos" />
              <label
                className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300"
                htmlFor="show_3ds_paymentsos"
              >
                Show 3DS 2 fields for a PaymentsOS-handled flow.
                <Link className="text-blue-600" href="#">
                  Read more here.
                </Link>
              </label>
              <Checkbox id="show_3ds_provider" />
              <label
                className="text-sm font-medium leading-none text-gray-700 dark:text-gray-300"
                htmlFor="show_3ds_provider"
              >
                Show 3DS 2 fields for a provider-handled / self-handled flow.
                <Link className="text-blue-600" href="#">
                  Read more here.
                </Link>
              </label>
            </div>
          </fieldset> */}
        </form>
      </CardContent>
      <ScrollArea className="w-max rounded-md border p-4">
        <CardContent>
          <CardTitle className="text-gray-900">Parameter list</CardTitle>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parameter</TableHead>
                <TableHead>Description</TableHead>
                {/* <TableHead>Example</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {params.map((param, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{param}</TableCell>
                  {/* Add description and example for each parameter */}
                  <TableCell>
                    {paramMapping[param]?.description || ""}
                  </TableCell>
                  {/* <TableCell>Example for {param}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
