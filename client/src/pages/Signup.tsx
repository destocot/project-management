import { Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useState } from "react";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: "bartender@email.com",
    username: "bartender",
    password: "glassofgod",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(await res.text());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input
          type="text"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </FormControl>
      <Button type="submit" colorScheme="blue">
        Sign Up
      </Button>
    </form>
  );
}
