import { useState, useEffect, MouseEvent } from "react";
import { Jumbotron, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentAssessment,
  unsetCurrentAssessment,
} from "../../redux/actions";
import Loading from "../../utils/Loading";
import DataFilters from "../../utils/data_utils/DataFilters";
import L, { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";
import DetailModal from "../../utils/data_utils/DetailModal";
import { IState } from "../../utils/typings/_interfaces";
import { getAllAssessments } from "../../api/ApiRoutes";
import BackButton from "../../utils/BackButton";
import FadeIn from "react-fade-in";

const DataMap = () => {
  const dispatch = useDispatch();
  const [showDetailModal, setShowDetailModal] = useState(false);
  const _id = useSelector((state: IState) => state.currentAssessment._id);
  const [loadingResponses, setLoadingResponses] = useState<boolean>(true);
  const [availableAssessments, setAvailableAssessments] = useState<Array<any>>(
    []
  );
  const [filteredAssessments, setFilteredAssessemnts] = useState<Array<any>>(
    []
  );
  const [defaultPosition, setDefaultPosition] = useState<LatLngExpression>([
    37.0902, -95.7129,
  ]);
  const zoom: number = 10;
  const icon: L.DivIcon = L.divIcon({
    className: "map-pin",
    iconSize: [20, 20],
    iconAnchor: [0, 0],
    popupAnchor: [15, 0],
  });
  const getAssessments = async () => {
    try {
      const assessments = await getAllAssessments();
      setDefaultPosition(assessments[0].coordinates);
      if (assessments && assessments.length > 0)
        setAvailableAssessments([...assessments]);
      setFilteredAssessemnts([...assessments]);
      setLoadingResponses(false);
    } catch (error: any) {}
  };
  const showDetail = (_id: string, st_address: string) => {
    dispatch(setCurrentAssessment({ _id, st_address }));
    setShowDetailModal(true);
  };
  useEffect(() => {
    if (!showDetailModal && _id) dispatch(unsetCurrentAssessment());
    // eslint-disable-next-line
  }, [showDetailModal]);
  useEffect(() => {
    getAssessments();
  }, []);
  return (
    <>
      <BackButton prev={"data"} />
      <DetailModal show={showDetailModal} setShow={setShowDetailModal} />
      <Jumbotron>
        <FadeIn>
          {/* <Row>
        <DataFilters filters={filteredAssessments} filterSetter={setFilteredAssessemnts} allAssessments={availableAssessments} />
      </Row> */}
          <Row>
            <Col>
              {loadingResponses ? (
                <Loading />
              ) : (
                <MapContainer
                  center={defaultPosition}
                  zoom={zoom}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution="&copy; <a href='http://osm.org/copyright'>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {filteredAssessments.map((el: any, i: number) => {
                    const coordinates = el.coordinates;
                    return (
                      <Marker
                        icon={icon}
                        key={i}
                        position={coordinates}
                        title={el.st_address}
                      >
                        <Popup>
                          <h6
                            onClick={(e: MouseEvent<HTMLTableRowElement>) =>
                              showDetail(el._id!, el.st_address!)
                            }
                          >
                            <strong>{el.st_address}</strong>
                          </h6>
                        </Popup>
                      </Marker>
                    );
                  })}
                </MapContainer>
              )}
            </Col>
          </Row>
        </FadeIn>
      </Jumbotron>
    </>
  );
};

export default DataMap;
