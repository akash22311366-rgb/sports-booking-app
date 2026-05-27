import { useState } from 'react'

function Login({ setUser }) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gray-100
      "
    >

      <div
        className="
          bg-white
          p-8
          rounded-2xl
          shadow-lg
          w-96
        "
      >

        <h1
          className="
            text-3xl
            font-bold
            mb-6
            text-center
            text-blue-600
          "
        >

          Login

        </h1>

        <input
          type="email"
          placeholder="Email"

          value={email}

          onChange={(e) =>
            setEmail(e.target.value)
          }

          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
        />

        <input
          type="password"
          placeholder="Password"

          value={password}

          onChange={(e) =>
            setPassword(e.target.value)
          }

          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
        />

        <button

          onClick={handleLogin}

          className="
            w-full
            bg-blue-500
            hover:bg-blue-600
            text-white
            py-3
            rounded-lg
          "
        >

          Login

        </button>

      </div>

    </div>
  )
}

export default Login