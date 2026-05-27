const handleLogin = async () => {

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/api/auth/login`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        email,
        password
      })
    }
  )

  const data = await response.json()

  if (data.token) {

    localStorage.setItem(
      'token',
      data.token
    )

    localStorage.setItem(
      'user',
      JSON.stringify(data.user)
    )

    setUser(data.user)

  } else {

    alert(data.message)

  }

}