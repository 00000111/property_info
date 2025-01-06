import React, { useState, useEffect } from 'react';
import { MainLayout, UserInputSection, PropertyInfoTable } from './components';
import { OpenAPI, PropertyService, PropertyDetailsResponse } from './client/backend';
import { ToastContainer, toast } from 'react-toastify';

OpenAPI.BASE = 'http://localhost:8000';

const App = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [propertyData, setPropertyData] = useState<PropertyDetailsResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (address) {
      setIsLoading(true);
      PropertyService.getPropertyDetailsApiPropertyDetailsGet(
        address
      ).then((response) => {
        setPropertyData(response);
        setIsLoading(false);
      }).catch((err) => {
        console.log("Error: ", err);
        toast.error("Something went wrong");
        setIsLoading(false);
      })
    }
  }, [address]);


  return (
    <MainLayout>
      <ToastContainer position='top-center' hideProgressBar={true} />
      <UserInputSection onSubmit={(val: string) => {
        setAddress(val);
      }} />
      {isLoading ? (
        <div>LOADING</div>
      ) :
        propertyData.length > 0 && (
          <PropertyInfoTable data={propertyData} />
        )}
    </MainLayout>
  );
}

export default App;
