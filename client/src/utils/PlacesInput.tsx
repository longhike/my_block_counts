import {
  useEffect,
  useState,
} from "react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng
} from "react-google-places-autocomplete";
import { Form } from "react-bootstrap";
import Loading from "./Loading";

type TPlacesResponse = {
    label?: string;
    value?: object;
}

type TLatLong = {
    lat?: string;
    lng?: string;
}

export const PlacesInput = () => {
    const [loaded, setLoaded] = useState<boolean>(false)
  const [currentQuery, setCurrentQuery] = useState<TPlacesResponse>({
      label: "",
      value: {}
  });
  const [streetAddress, setStreetAddress] = useState<string>("")
  const [coordinates, setCoordinates] = useState<TLatLong>({
      lat: "",
      lng: ""
  })

  const implementPlacesScript = () => {
      if (!document.getElementById("places_script")) {
          
      }
  }

  useEffect(() => {
    console.log(coordinates)
  }, [coordinates])

  useEffect(() => {
      const fetchLatLong = async () => {
        if (currentQuery && currentQuery.label && currentQuery.label.length > 0) {
            setStreetAddress(currentQuery.label)
            const geocodeResponse = await geocodeByAddress(currentQuery.label)
            const { lat, lng } = await getLatLng(geocodeResponse[0])
            setCoordinates({
                ...coordinates,
                lat: lat.toString(),
                lng: lng.toString()
            })
          }
      }
      fetchLatLong()
  }, [currentQuery])

  return (
    <Form.Group>
        {loaded ? <GooglePlacesAutocomplete
        selectProps={{
          value: currentQuery,
          onChange: (newPlace:TPlacesResponse) => {
              setCurrentQuery({
                  ...currentQuery,
                  ...newPlace
              })
          },
          styles: {
            option: (provided: any) => ({
              ...provided,
              textAlign: "left",
            }),
          },
        }}
      /> : <Loading />}
      
    </Form.Group>
  );
};
