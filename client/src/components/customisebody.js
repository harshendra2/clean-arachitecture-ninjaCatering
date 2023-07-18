import React, { useState, useEffect } from "react";
import "../styles/customepage.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getcustomeItem } from "../services/Apis";
import Select from "react-dropdown-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { getPackagesItems } from "../services/Apis";
import { ToastContainer, toast } from "react-toastify";
import { deleteaddress } from "../services/Apis";
import jwt_decode from "jwt-decode";
import { OrderItem } from "../services/Apis";
import { getaddress } from "../services/Apis";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { addDays } from 'date-fns'; 


function Customisebody() {
  const navigate = useNavigate();

  const [occasion, setOccasion] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [times, setTimes] = useState("");
  const [vegguest, setvegguest] = useState(10);
  const [Nonvegguest, setNonvegguest] = useState(10);
  const [pricelist, setPricelist] = useState(false);
  const [orderAddress, setOrderaddress] = useState("");
  const [address, setaddress] = useState([]);
  const [totalamount, setTotalamount] = useState("");
  const [GST, setGst] = useState("");
  const [grandtotal, setGrandtotal] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isVisible, setIsVisible] = useState(true);


  const handleSelectTimes = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
    // Process the selected times as needed
    setTimes(selectedOptions) // Example: Log the selected times to the console
  };
  

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prevIsVisible) => !prevIsVisible);
    }, 750);

    return () => clearInterval(interval);
  }, []);

  const token = localStorage.getItem("userdbtoken");

  const userId = jwt_decode(token);

  const data = {
    userId,
  };
  const useDetails = {
    selectedDate,
    times,
    vegguest,
    Nonvegguest,
    orderAddress,
    latitude,
    longitude,
  };

  const fetchuseraddress = async (userId) => {
    try {
      const response = await getaddress({ id: userId });
      setaddress(response.data.Address);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("userdbtoken");
    if (token) {
      const userObject = jwt_decode(token);

      fetchuseraddress(userObject._id);
    }
  }, []);

  const Delete = async (id) => {
    const data = {
      id,
      userId,
    };
    const response = await deleteaddress(data);
    if (response.status === 200) {
      toast.success("Address deleted succefully");
      fetchuseraddress(userId);
    }
  };

  //give currecnt location

  const getLocation = (e) => {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  // add new Adress
  const addadress = () => {
    navigate("/addcustomepageadress");
  };

  const submite = () => {
    if (!occasion) {
      toast.error("Please select occasion");
    } else if (!selectedDate) {
      toast.error("Please select date");
    } else if (!times) {
      toast.error("Please select time");
    } else if (Nonvegguest < 10) {
      toast.error("Minmum 10 guest");
    } else {
      let customeitemprices = 0;
      let dessertprice = 0;
      let startersprice = 0;
      let mainprice = 0;
      let riceprice = 0;

      const updatedSelectedDesserts = selectedDessert.map((selectedData) => {
        const totalPrice = selectedData.count * selectedData.price;
        dessertprice += totalPrice;

        return {
          ...selectedData,
          totalPrice: totalPrice,
        };
      });

      const updatedSelectedstarters = selectedItems.map((selectedData) => {
        const totalPrice = selectedData.count * selectedData.price;
        startersprice += totalPrice;

        return {
          ...selectedData,
          totalPrice: totalPrice,
        };
      });

      const updatedSelectedmain = selectedMain.map((selectedData) => {
        const totalPrice = selectedData.count * selectedData.price;
        mainprice += totalPrice;

        return {
          ...selectedData,
          totalPrice: totalPrice,
        };
      });

      const updatedSelectedrice = selectedRice.map((selectedData) => {
        const totalPrice = selectedData.count * selectedData.price;
        riceprice += totalPrice;

        return {
          ...selectedData,
          totalPrice: totalPrice,
        };
      });

      customeitemprices = dessertprice + startersprice + mainprice + riceprice;

      setPricelist(!pricelist);
      const tempgrandtotal = packageprice / 10;

      const tempamout = tempgrandtotal * Nonvegguest;
      setTotalamount(tempamout + customeitemprices);
      const gst = (tempamout + customeitemprices) * 0.18;
      setGst(gst);
      setGrandtotal(gst + tempamout + customeitemprices);
    }
  };

  const [packageprice, setPackagePrice] = useState("");
  //ninjabox and ninja buffet id
  const { id } = useParams();
  const datafetch = async () => {
    const response = await getPackagesItems({ id });

    if (response.status === 200) {
      setPackagePrice(response.data.price);
    }
  };

  useEffect(() => {
    datafetch();
  }, []);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const [user, setUser] = useState([]);
  const [main, setMain] = useState([]);
  const [rice, setRice] = useState([]);
  const [dessert, setDessert] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getcustomeItem();
        const categoryId = "649d5ee2b9a5c828696ddbf5";
        const filteredData = response.data.filter(
          (category) => category.category === categoryId
        );
        setUser(filteredData);

        const mains = "649d5ef2b9a5c828696ddbf7";
        const filteredDatas = response.data.filter(
          (category) => category.category === mains
        );
        setMain(filteredDatas);

        const rice = "649d5f02b9a5c828696ddbf9";
        const filteredDatass = response.data.filter(
          (category) => category.category === rice
        );
        setRice(filteredDatass);

        const dessert = "649d5f10b9a5c828696ddbfb";
        const filteredDatasss = response.data.filter(
          (category) => category.category === dessert
        );
        setDessert(filteredDatasss);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const [showList, setShowList] = useState(false);

  const handleButtonClick = () => {
    setShowList(!showList);
  };

  const [selectedItems, setSelectedItems] = useState([]);

  const handleCheckboxChange = (event, user) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      const isUserIncluded = selectedItems.some(
        (item) => item._id === user._id
      );

      if (!isUserIncluded) {
        setSelectedItems([...selectedItems, user]);
      }
    } else {
      setSelectedItems(selectedItems.filter((item) => item._id !== user._id));
    }
  };

  const [mainList, setMainList] = useState(false);

  const handleButtonMain = () => {
    setMainList(!mainList);
  };

  const [selectedMain, setSelectedMain] = useState([]);

  const handleCheckboxMain = (event, data) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      const isUserIncluded = selectedItems.some(
        (item) => item._id === data._id
      );

      if (!isUserIncluded) {
        setSelectedMain([...selectedMain, data]);
      }
    } else {
      setSelectedItems(selectedMain.filter((item) => item._id !== data._id));
    }
  };

  const [riceList, setRiceList] = useState(false);

  const handleButtonRice = () => {
    setRiceList(!riceList);
  };

  const [selectedRice, setSelectedRice] = useState([]);

  const handleCheckboxRice = (event, data) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      const isUserIncluded = selectedItems.some(
        (item) => item._id === data._id
      );

      if (!isUserIncluded) {
        setSelectedRice([...selectedRice, data]);
      }
    } else {
      setSelectedItems(selectedRice.filter((item) => item._id !== data._id));
    }
  };

  const [dessertList, setDessertList] = useState(false);

  const handleButtonDessert = () => {
    setDessertList(!dessertList);
  };

  const [selectedDessert, setSelectedDessert] = useState([]);

  const handleCheckboxDessert = (event, data) => {
    const isChecked = event.target.checked;

    if (isChecked) {
      const isUserIncluded = selectedItems.some(
        (item) => item._id === data._id
      );

      if (!isUserIncluded) {
        setSelectedDessert([...selectedDessert, data]);
      }
    } else {
      setSelectedItems(selectedDessert.filter((item) => item._id !== data._id));
    }
  };

  const handleDelete = (id) => {
    setSelectedDessert(selectedDessert.filter((item) => item._id !== id));
    setSelectedRice(selectedRice.filter((item) => item._id !== id));
    setSelectedMain(selectedMain.filter((item) => item._id !== id));
    setSelectedItems(selectedItems.filter((item) => item._id !== id));
  };

  const handleIncrement = (index) => {
    const updatedDesserts = [...selectedDessert];
    updatedDesserts[index] = {
      ...updatedDesserts[index],
      count: Number(updatedDesserts[index].count) + 1,
    };
    setSelectedDessert(updatedDesserts);
  };

  const handleDecrement = (index) => {
    const updatedDesserts = [...selectedDessert];
    if (Number(updatedDesserts[index].count) > 0) {
      updatedDesserts[index] = {
        ...updatedDesserts[index],
        count: Number(updatedDesserts[index].count) - 1,
      };
      setSelectedDessert(updatedDesserts);
    }
  };

  const handleBreadIncrement = (index) => {
    const updatedBread = [...selectedRice];
    updatedBread[index] = {
      ...updatedBread[index],
      count: Number(updatedBread[index].count) + 1,
    };
    setSelectedRice(updatedBread);
  };

  const handleBreadDecrement = (index) => {
    const updatedBread = [...selectedRice];
    if (Number(updatedBread[index].count) > 0) {
      updatedBread[index] = {
        ...updatedBread[index],
        count: Number(updatedBread[index].count) - 1,
      };
      setSelectedRice(updatedBread);
    }
  };

  const handleMainIncrement = (index) => {
    const updatedMain = [...selectedMain];
    updatedMain[index] = {
      ...updatedMain[index],
      count: Number(updatedMain[index].count) + 1,
    };
    setSelectedMain(updatedMain);
  };

  const handleMainDecrement = (index) => {
    const updatedMain = [...selectedMain];
    if (Number(updatedMain[index].count) > 0) {
      updatedMain[index] = {
        ...updatedMain[index],
        count: Number(updatedMain[index].count) - 1,
      };
      setSelectedMain(updatedMain);
    }
  };

  const handleStartIncrement = (index) => {
    const updatedStarter = [...selectedItems];
    updatedStarter[index] = {
      ...updatedStarter[index],
      count: Number(updatedStarter[index].count) + 1,
    };
    setSelectedItems(updatedStarter);
  };

  const handleStartDecrement = (index) => {
    const updatedStarter = [...selectedItems];
    if (Number(updatedStarter[index].count) > 0) {
      updatedStarter[index] = {
        ...updatedStarter[index],
        count: Number(updatedStarter[index].count) - 1,
      };
      setSelectedItems(updatedStarter);
    }
  };

  //vegguest

  const onDisplays = () => {
    //Dessert
    const updatedSelectedDesserts = selectedDessert.map((selectedData) => {
      const dessertData = dessert.find((data) => data._id === selectedData._id);
      let guesttype;
      {
        dessertData.Nonveg === "nonveg"
          ? (guesttype = Nonvegguest)
          : (guesttype = vegguest);
      }

      if (dessertData) {
        const out = dessertData.count / 10;
        const total = out * guesttype;

        const updatedData = {
          ...selectedData,
          count: total,
        };

        return updatedData;
      }

      return selectedData;
    });

    setSelectedDessert(updatedSelectedDesserts);

    //sarters

    const updatedSelectedstarters = selectedItems.map((selectedData) => {
      const startersData = user.find((data) => data._id === selectedData._id);
      let guesttype1;
      {
        startersData.Nonveg === "nonveg"
          ? (guesttype1 = Nonvegguest)
          : (guesttype1 = vegguest);
      }

      if (startersData) {
        const out = startersData.count / 10;
        const total = out * guesttype1;

        const updatedData1 = {
          ...selectedData,
          count: total,
        };

        return updatedData1;
      }

      return selectedData;
    });

    setSelectedItems(updatedSelectedstarters);

    //Mains

    const updatedSelectedmain = selectedMain.map((selectedData) => {
      const mainData = main.find((data) => data._id === selectedData._id);
      let guesttype2;
      {
        mainData.Nonveg === "nonveg"
          ? (guesttype2 = Nonvegguest)
          : (guesttype2 = vegguest);
      }

      if (mainData) {
        const out = mainData.count / 10;
        const total = out * guesttype2;

        const updatedData2 = {
          ...selectedData,
          count: total,
        };

        return updatedData2;
      }

      return selectedData;
    });

    setSelectedMain(updatedSelectedmain);

    //Rice

    const updatedSelectedrice = selectedRice.map((selectedData) => {
      const riceData = rice.find((data) => data._id === selectedData._id);
      let guesttype3;
      {
        riceData.Nonveg === "nonveg"
          ? (guesttype3 = Nonvegguest)
          : (guesttype3 = vegguest);
      }

      if (riceData) {
        const out = riceData.count / 10;
        const total = out * guesttype3;

        const updatedData3 = {
          ...selectedData,
          count: total,
        };

        return updatedData3;
      }

      return selectedData;
    });

    setSelectedRice(updatedSelectedrice);
  };

  //----------------------Order --------------------------------------------------//

  const [orderchekcing, setOrderchecking] = useState(false);

  const orderconfirm = async () => {
    const combinedData = {
      selectedDessert,
      selectedItems,
      selectedMain,
      selectedRice,
    };

    if (useDetails.orderAddress || useDetails.latitude) {
      setOrderchecking(true);
    }

    if (orderchekcing === false) {
      toast.error("Please select order address");
    } else if (!combinedData) {
      toast.error("Please select Items");
    } else {
      navigate("/stripe-checkout",{state:grandtotal/2})
      const response = await OrderItem({
        combinedData,
        grandtotal,
        data,
        useDetails,
      });
      if (response.status === 200) {
        setSelectedDessert("");
        setSelectedRice("");
        setSelectedMain("");
        setSelectedItems("");
        setGrandtotal("");
        setPricelist("");
        setLatitude(null);
        setLongitude(null);
      }
    }
  };

  return (
    <div className="Customepackbody">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3" style={{ marginLeft: "12%" }}>
          <Form.Group as={Col} md="2" controlId="validationCustom">
            <Form.Label>Occasion</Form.Label>
            <Form.Select onChange={(e) => setOccasion(e.target.value)} required>
              <option value="">Select an occasion</option>
              <option value="birthday">Birthday</option>
              <option value="anniversary">Anniversary</option>
              <option value="wedding">Wedding</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} md="2" controlId="validationCustomUsername">
  <Form.Label>Event Date</Form.Label>
  <InputGroup onChange={(e) => setSelectedDate(e.target.value)} hasValidation>
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      className="form-control"
      placeholderText="Select a date"
      aria-describedby="inputGroupPrepend"
      minDate={new Date()} 
      minDate={addDays(new Date(), 1)} 
      required
    />
  </InputGroup>
</Form.Group>

          <Form.Group as={Col} md="2" controlId="validationCustom02">
         
  <Form.Label>Delivery Time</Form.Label>
  <Form.Select onChange={handleSelectTimes} required multiple>
    <option value="11:00 am">11:00 am</option>
    <option value="11:30 am">11:30 am</option>
    <option value="12:00 pm">12:00 pm</option>
    <option value="12:30 pm">12:30 pm</option>
    <option value="1:00 pm">1:00 pm</option>
    <option value="1:30 pm">1:30 pm</option>
    <option value="2:00 pm">2:00 pm</option>
    <option value="2:30 pm">2:30 pm</option>
    <option value="3:00 pm">3:00 pm</option>
    <option value="5:00 pm">5:00 pm</option>
    <option value="5:30 pm">5:30 pm</option>
    <option value="6:00 pm">6:00 pm</option>
    <option value="6:30 pm">6:30 pm</option>
    <option value="7:00 pm">7:00 pm</option>
    <option value="7:30 pm">7:30 pm</option>
    <option value="8:00 pm">8:00 pm</option>
    <option value="8:30 pm">8:30 pm</option>
    <option value="9:00 pm">9:00 pm</option>
  </Form.Select>
</Form.Group>


          <Form.Group as={Col} md="2" controlId="validationCustom01">
            <Form.Label>Veg Guest</Form.Label>
            <Form.Control
              required
              type="Number"
              placeholder=""
              onChange={(e) => {
                onDisplays();
                setvegguest(e.target.value);
              }}
              defaultValue="10"
            />
          </Form.Group>
          <Form.Group as={Col} md="2" controlId="validationCustom01">
            <Form.Label>Non Veg Guest</Form.Label>
            <Form.Control
              required
              type="Number"
              placeholder=""
              defaultValue="10"
              onChange={(e) => {
                onDisplays();
                setNonvegguest(e.target.value);
              }}
            />
          </Form.Group>
        </Row>
      </Form>

      <div className="careatmenu">
        <h3 className="createHeadding">Create Your Menu</h3>
        <h4 className="createHeadding">Starters</h4>

        <div>
          {selectedItems &&
            selectedItems.map((user, index) => (
              <label className="customelabels" key={user._id}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <img
                      src={user.img}
                      style={{
                        width: "70px",
                        borderRadius: "2px",
                        height: "70px",
                        marginRight: "10px",
                      }}
                    />
                    {user.Nonveg === "veg" ? (
                      <img
                        className="guesttype"
                        src="https://new.caterninja.com/diy%20images/vegLogo.png"
                      />
                    ) : (
                      <img
                        className="guesttype"
                        src="https://new.caterninja.com/diy%20images/Group%20962.png"
                      />
                    )}
                    <span className="labelname">{user.name}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button onClick={() => handleStartDecrement(index)}>
                      -
                    </button>
                    <input
                      style={{ width: "75px" }}
                      type="text"
                      readOnly
                      value={`${user.count} ${user.foodType}`}
                    />
                    <button onClick={() => handleStartIncrement(index)}>
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="delete-button"
                    style={{ border: "none" }}
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="delete-icon"
                      style={{ color: "red" }}
                    />
                  </button>
                </div>
              </label>
            ))}
        </div>

        <div className="serarchdiv">
          <button
            onClick={() => {
              handleButtonClick();
              onDisplays();
            }}
            className="customlist"
          >
            Select Starters
          </button>
          {showList && (
            <div className="customediv">
              <ul style={{ listStyleType: "none" }}>
                {user.map((user) => (
                  <li key={user._id}>
                    <label className="customelabel">
                      <img
                        src={user.img}
                        className="circle"
                        style={{
                          width: "50px",
                          borderRadius: "50px",
                          height: "50px",
                          marginRight: "10px",
                        }}
                      />
                      <span style={{ marginRight: "10px" }}>{user.name}</span>
                      <input
                        type="checkbox"
                        className="checkbox"
                        onChange={(event) => handleCheckboxChange(event, user)}
                      />
                    </label>
                    <br />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <h4 className="createHeadding">Mains</h4>

        <div>
          {selectedMain &&
            selectedMain.map((user, index) => (
              <label className="customelabels" key={user._id}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <img
                      src={user.img}
                      style={{
                        width: "70px",
                        borderRadius: "2px",
                        height: "70px",
                        marginRight: "10px",
                      }}
                    />
                    {user.Nonveg === "veg" ? (
                      <img
                        className="guesttype"
                        src="https://new.caterninja.com/diy%20images/vegLogo.png"
                      />
                    ) : (
                      <img
                        className="guesttype"
                        src="https://new.caterninja.com/diy%20images/Group%20962.png"
                      />
                    )}
                    <span className="labelname">{user.name}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button onClick={() => handleMainDecrement(index)}>
                      -
                    </button>
                    <input
                      style={{ width: "75px" }}
                      type="text"
                      readOnly
                      value={`${user.count} ${user.foodType}`}
                    />
                    <button onClick={() => handleMainIncrement(index)}>
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="delete-button"
                    style={{ border: "none" }}
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="delete-icon"
                      style={{ color: "red" }}
                    />
                  </button>
                </div>
              </label>
            ))}
        </div>
        <div className="serarchdiv">
          <button
            onClick={() => {
              handleButtonMain();
              onDisplays();
            }}
            className="customlist"
          >
            Select Starters
          </button>
          {mainList && (
            <div className="customediv">
              <ul style={{ listStyleType: "none" }}>
                {main.map((user) => (
                  <li key={user._id}>
                    <label className="customelabel">
                      <img
                        src={user.img}
                        className="circle"
                        style={{
                          width: "50px",
                          borderRadius: "50px",
                          height: "50px",
                          marginRight: "10px",
                        }}
                      />
                      <span style={{ marginRight: "10px" }}>{user.name}</span>
                      <input
                        type="checkbox"
                        className="checkbox"
                        onChange={(event) => handleCheckboxMain(event, user)}
                      />
                    </label>
                    <br />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <h4 className="createHeadding">Bread Rice And Noodles</h4>

        <div>
          {selectedRice &&
            selectedRice.map((user, index) => (
              <label className="customelabels" key={user._id}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <img
                      src={user.img}
                      style={{
                        width: "70px",
                        borderRadius: "2px",
                        height: "70px",
                        marginRight: "10px",
                      }}
                    />
                    {user.Nonveg === "veg" ? (
                      <img
                        className="guesttype"
                        src="https://new.caterninja.com/diy%20images/vegLogo.png"
                      />
                    ) : (
                      <img
                        className="guesttype"
                        src="https://new.caterninja.com/diy%20images/Group%20962.png"
                      />
                    )}
                    <span className="labelname">{user.name}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button onClick={() => handleBreadDecrement(index)}>
                      -
                    </button>
                    <input
                      style={{ width: "75px" }}
                      type="text"
                      readOnly
                      value={`${user.count} ${user.foodType}`}
                    />
                    <button onClick={() => handleBreadIncrement(index)}>
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="delete-button"
                    style={{ border: "none" }}
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="delete-icon"
                      style={{ color: "red" }}
                    />
                  </button>
                </div>
              </label>
            ))}
        </div>
        <div className="serarchdiv">
          <button
            onClick={() => {
              handleButtonRice();
              onDisplays();
            }}
            className="customlist"
          >
            Select Starters
          </button>
          {riceList && (
            <div className="customediv">
              <ul style={{ listStyleType: "none" }}>
                {rice.map((user) => (
                  <li key={user._id}>
                    <label className="customelabel">
                      <img
                        src={user.img}
                        className="circle"
                        style={{
                          width: "50px",
                          borderRadius: "50px",
                          height: "50px",
                          marginRight: "10px",
                        }}
                      />
                      <span style={{ marginRight: "10px" }}>{user.name}</span>
                      <input
                        type="checkbox"
                        className="checkbox"
                        onChange={(event) => handleCheckboxRice(event, user)}
                      />
                    </label>
                    <br />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <h4 className="createHeadding">Desserts</h4>

        <div>
          {selectedDessert &&
            selectedDessert.map((user, index) => (
              <label className="customelabels" key={user._id}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div>
                    <img
                      src={user.img}
                      style={{
                        width: "70px",
                        borderRadius: "2px",
                        height: "70px",
                        marginRight: "10px",
                      }}
                    />
                    {user.Nonveg === "veg" ? (
                      <img
                        className="guesttype"
                        src="https://new.caterninja.com/diy%20images/vegLogo.png"
                      />
                    ) : (
                      <img
                        className="guesttype"
                        src="https://new.caterninja.com/diy%20images/Group%20962.png"
                      />
                    )}
                    <span className="labelname">{user.name}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button onClick={() => handleDecrement(index)}>-</button>
                    <input
                      style={{ width: "75px" }}
                      type="text"
                      readOnly
                      value={`${user.count} ${user.foodType}`}
                    />
                    <button onClick={() => handleIncrement(index)}>+</button>
                  </div>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="delete-button"
                    style={{ border: "none" }}
                  >
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="delete-icon"
                      style={{ color: "red" }}
                    />
                  </button>
                </div>
              </label>
            ))}
        </div>
        <div className="serarchdiv">
          <button
            onClick={() => {
              handleButtonDessert();
              onDisplays();
            }}
            className="customlist"
          >
            Select Starters
          </button>
          {dessertList && (
            <div className="customediv">
              <ul style={{ listStyleType: "none" }}>
                {dessert.map((user) => (
                  <li key={user._id}>
                    <label className="customelabel">
                      <img
                        src={user.img}
                        className="circle"
                        style={{
                          width: "50px",
                          borderRadius: "50px",
                          height: "50px",
                          marginRight: "10px",
                        }}
                      />
                      <span style={{ marginRight: "10px" }}>{user.name}</span>
                      <input
                        type="checkbox"
                        className="checkbox"
                        onChange={(event) => handleCheckboxDessert(event, user)}
                      />
                    </label>
                    <br />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="userDetails">
          <h2 className="userHeadding">Deliver to:</h2>

          <div className="formContainer">
            <Form
              noValidate
              className="userDetailsform"
              validated={validated}
              onSubmit={handleSubmit}
            >
              <div>
                <div className="delivery-addresses row">
                  {address && address.length > 0 ? (
                    address.map((address, index) => (
                      <div className="col-md-6" style={{minWidth:"350px"}} key={address._id}>
                        <div className="card shadow-sm">
                          <div className="card-body">
                            <label>
                              <input
                                type="radio"
                                id={`address_${index}`}
                                name="address"
                                onChange={(e) =>
                                  setOrderaddress(e.target.value)
                                }
                                value={` ${address.country}, ${address.city}, ${address.state}, ${address.postcode}, ${address.phone}`}
                                required
                              />

                              <br />
                              <h3>Phone Number: {address.phone}</h3>
                              <br />
                              <h3>City: {address.city}</h3>
                              <br />
                              <h3>State: {address.state}</h3>
                              <br />
                              <h3>Country: {address.country}</h3>
                              <br />
                              <h3>Post Code: {address.postcode}</h3>
                              <br />
                              <br />
                              <Link
                                to={`/editcustomepageaddress/${address._id}`}
                                className="btn btn-success"
                              >
                                {" "}
                                Edit Address
                              </Link>

                              <button
                                className="btn btn-danger"
                                onClick={() => Delete(address._id)}
                              >
                                Delete
                              </button>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>
                      <p>No Address Found. Please add Address.</p>
                    </div>
                  )}
                </div>

                <div className="add-new-address" style={{marginTop:"20px"}}>
                  <a
                    onClick={addadress}
                    className="btn bg-success apply-coupon"
                  >
                    <strong>Add new Address</strong>
                  </a>

                  <a
        onClick={getLocation}
        style={{ marginLeft: '30px' }}
        className="btn bg-success apply-coupon"
      >
        <strong>Use Current Location</strong>
      </a>
                </div>
              </div>
            </Form>
          </div>
        </div>

        <button className="checkPrice" onClick={submite}>
          Check Price
        </button>

        {pricelist && (
          <div className="priceContainer">
            <div>
              <h3>Items Total</h3>
              <h3 className="price">
                <span>&#8377;</span>
                {totalamount}
              </h3>
            </div>
            <div>
              <h3>GST</h3>
              <h3>
                <span>&#8377;</span>
                {GST}
              </h3>
            </div>
            <div>
              <h3>Grand Total</h3>
              <h3>
                <span>&#8377;</span>
                {grandtotal}
              </h3>
            </div>
          </div>
        )}
        
        {pricelist && (
        <>
          <p style={{ color: 'red', visibility: isVisible ? 'visible' : 'hidden' ,paddingLeft:"25%" }}>
            You have to pay advance of 50% of payment to confirm the order
          </p>
          <button className="OrderConfirmbutton" onClick={orderconfirm}>
          Pay Now
          </button>
        </>
      )}
      </div>

      <div className="whiteSpace"></div>

      <ToastContainer />
    </div>
  );
}
export default Customisebody;
