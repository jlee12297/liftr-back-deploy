
  const [test, setData] = useState(null)

  const apiTest = () => {
    fetch('http://localhost:3001/api/coaches', {
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'no-cors'
    })
      .then(res => res.json())
      .then(data => {
        setData(data)
        console.log(test)
      })

  }

  useEffect(() => {
    //check if user is logged in
    //if yes do a get route find user from auth0
    //else post a user with stuff from auth0 Because its a new user
    apiTest()

  }, [])