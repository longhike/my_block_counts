import { useState, useEffect } from "react";
import { getAvailableFilters } from "../../api/ApiRoutes";
import { Button, Dropdown, Form } from "react-bootstrap";
import Loading from "../../utils/Loading";
const DataFilters = ({ filters, filterSetter, allAssessments }: any) => {
  const [loading, setLoading] = useState(true);

  const [filterList, setFilterList] = useState({});
  const [availableCities, setAvailableCities] = useState<Array<string>>([]);
  const [availableStates, setAvailableStates] = useState<Array<string>>([]);
  const [availableZips, setAvailableZips] = useState([]);

  const [currentFilters, setCurrentFilters] = useState([]);

  const getAndSetAvailableFilters = async () => {
    const response: any = await getAvailableFilters(["city", "state"]);
    for (const key in response) {
      const cur = response[key];
      switch (key) {
        case "city":
          setAvailableCities([...cur]);
          break;
        case "state":
          setAvailableStates([...cur]);
          break;
        default:
          break;
      }
    }
    setLoading(false);
  };

  const Filters = () => {
    return (
      <>
        <Form.Group>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" size="sm">
              city
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {availableCities.map((el, i) => {
                return (
                  <Dropdown.Item as="button" key={i}>
                    {el}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" size="sm">
              state
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {availableStates.map((el, i) => {
                return (
                  <Dropdown.Item as="button" key={i}>
                    {el}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </Form.Group>
        <Form.Group>
          <Button size="sm" onClick={() => filterSetter([...allAssessments])}>
            Clear
          </Button>
        </Form.Group>
      </>
    );
  };

  useEffect(() => {
    getAndSetAvailableFilters();
    //eslint-disable-next-line
  }, []);

  return <>{loading ? <Loading /> : <Filters />}</>;
};

export default DataFilters;
