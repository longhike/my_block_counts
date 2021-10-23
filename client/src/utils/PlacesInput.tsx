import {
  useEffect,
  useState,
  ChangeEvent,
} from "react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import { Form } from "react-bootstrap";
import { TPlacesResponse, TLatLng, TParsedAddressShape, TPlacesInputProps } from "./typings/_types";

export const PlacesInput = ({ responses, setResponses }: TPlacesInputProps) => {
  const [parsed, setParsed] = useState<TParsedAddressShape>({
    number: "",
    street: "",
    neighborhood: "",
    city: "",
    state: "",
    country: "",
    zip: "",
  });
 
  const parseAddressAndHandleParsedAddressedState = (arr: google.maps.GeocoderAddressComponent[]): void => {
    const newOne: any = {};
    for (let i = 0; i < arr.length; i++) {
      const { short_name, types } = arr[i];
      for (let j = 0; j < types.length; j++) {
        switch (types[j]) {
          case "street_number":
            newOne.number = short_name;
            break;
          case "route":
            newOne.street = short_name;
            break;
          case "neighborhood":
            newOne.neighborhood = short_name;
            break;
          case "locality":
            newOne.city = short_name;
            break;
          case "administrative_area_level_1":
            newOne.state = short_name;
            break;
          case "country":
            newOne.country = short_name;
            break;
          case "postal_code":
            newOne.zip = short_name;
            break;
          default:
            break;
        }
      }
    }
    setParsed({ ...parsed, ...newOne });
  };

  const handleSelection = async (v: TPlacesResponse, e: ChangeEvent): Promise<void> => {
    if (v && v.label) {
      const [geoResponse]: google.maps.GeocoderResult[] =
        await geocodeByAddress(v.label);
      const { lat, lng }: TLatLng = await getLatLng(geoResponse);
      setResponses({
        ...responses,
        st_address: geoResponse.formatted_address,
        coordinates: JSON.stringify([lat.toString(), lng.toString()]),
      });
      parseAddressAndHandleParsedAddressedState(geoResponse.address_components);
    }
  };

  useEffect(() => {
    setResponses({ ...responses, ...parsed });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsed]);

  return (
    <Form.Group>
      <GooglePlacesAutocomplete
        selectProps={{
          value: responses.st_address,
          placeholder: "Enter address closest to your vantage point",
          onChange: handleSelection,
          isClearable: true,
          styles: {
            option: (provided: any) => ({
              ...provided,
              textAlign: "left",
            }),
          },
          withSessionToken: true
        }}
      />
    </Form.Group>
  );
};
