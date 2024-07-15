import { useEffect, useState } from 'react';
const initialState1 = false;
const initialState2 = {
  name: '',
  city: ''
}
const initialState3 = 0;

const Hooks1 = () => {

  const [toggleText, setToggleText] = useState(initialState1);
  const [formData, setFormData] = useState(initialState2);
  let [count, setCount] = useState(initialState3);
  const [showText, setShowText] = useState(false);
  const [productList, setProductList] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products')
      const result = await response.json();

      if(result && result.products) setProductList(result.products);
    } catch (error) {
      
    }
  }
  useEffect(() => {
    if(count === 5) setShowText(true);
  },[count])

  useEffect(() => {
    if(count === 2) fetchAllProducts();
  },[count])

  const handleToggleText = () => {
    setToggleText(!toggleText);
  }

  const handleUpdateName = (event) => {
      setFormData({
        ...formData,
        name: event.target.value,
      })
  }

  const handleUpdateCity = (event) => {
    setFormData({
      ...formData,
      city: event.target.value,
    })
  }

  const handleUpdateCount = () => {
    setCount(() => count++);
  }
  console.log("formData = ",formData)
  return (
    <div className="hooks1">
      <h1> UseState Hook </h1>
      <div>
        {
          toggleText ? <p>Welcome to React</p> : <p> Bye Javascript</p>
        }
        <button onClick={handleToggleText}>Toggle the content</button>
      </div>
      <br />
      <div>
        <input onChange={handleUpdateName} type="text" name='name' placeholder='enter the name'/>
        <select onChange={handleUpdateCity} name='city'>
          <option value={""} id="">Select City</option>
          <option value={"bengaluru"} id="bengaluru">Bengaluru</option>
          <option value={"chennai"} id="chennai">Chennai</option>
        </select>
        <br />
        <div>
          Name is {formData.name} and city is {formData.city}
        </div>
      </div>
      <br />
      <h1> UseEffect Hook</h1>
      <p> My Count is {count}</p>
      {
        showText ? <p>Hello World!</p> : null
      }
      <button onClick={handleUpdateCount}>Count</button>
      <br />
      <ul>
        {
          productList.map((item) => (<li>{item.title}</li>))
        }
      </ul>
    </div>
  );
}

export default Hooks1;
