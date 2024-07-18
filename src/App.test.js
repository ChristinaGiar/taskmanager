import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import user from '@testing-library/user-event';
import '@testing-library/jest-dom';
import React from 'react';
import AuthPage from "./pages/AuthPage";
import { authAction } from "./pages/AuthPage";

describe('Authentication page', () => {

let emailInput, passwordInput, nameInput, signUpButton;

const setUp = (routes) => {

  const router = createMemoryRouter(routes, { initialEntries: ["/auth"] });

  render(<RouterProvider router={router} />);
  emailInput = screen.getByRole('textbox', { name: /email/i });
  passwordInput = screen.getByLabelText(/password/i);
  nameInput = screen.getByLabelText(/name/i);
  signUpButton = screen.getByRole('button');
};

test('lands on sign up page and renders appropriate inputs', () => {
  const routes = [{
    path: "/auth",
    element: <AuthPage />,
  }];

  setUp(routes);

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
  expect(nameInput).toBeInTheDocument();
  expect(signUpButton).toBeInTheDocument();
});

test('calls the action when submiting the sign up form', async () => {
  const mock = jest.fn();

  const routes = [{
    path: "/auth",
    element: <AuthPage />,
    action: mock
  }];

  setUp(routes);

  user.click(emailInput);
  const email = 'jonh@google.gr';
  user.keyboard(email);
  user.click(passwordInput);
  user.keyboard('dd1235!');
  await user.click(signUpButton);
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith(expect.objectContaining({
    request: expect.objectContaining({ _bodyText: "email=jonh%40google.gr&password=dd1235%21&name=" })
  }));
})

test('shows correct validation errors in sign up form', async () => {

  const routes = [{
    path: "/auth",
    element: <AuthPage />,
    action: authAction
  }];

  setUp(routes);

  user.click(emailInput);
  user.keyboard('jonh12561gmal.gr');
  user.click(passwordInput);
  user.keyboard('dd123');
  await user.click(signUpButton);

  await waitFor(() => {
    expect(screen.getByTestId('email-format-error')).toBeInTheDocument();
  })
  await waitFor(() => {
    expect(screen.getByTestId('password-format-error')).toBeInTheDocument();
  })
  await waitFor(() => {
    expect(screen.getByTestId('name-format-error')).toBeInTheDocument();
  })
});

test('shows correct server errors in sign up form', async () => {

  const routes = [{
    path: "/auth",
    element: <AuthPage />,
    action: authAction
  }];

  setUp(routes);

  user.click(emailInput);
  user.keyboard('owner_us2@mcapp.com');
  user.click(passwordInput);
  user.keyboard('dd12356');
  user.click(nameInput);
  user.keyboard('John');
  await user.click(signUpButton);

  await waitFor(() => {
    expect(screen.getByTestId('email-server-error')).toBeInTheDocument();
  })
});
});
