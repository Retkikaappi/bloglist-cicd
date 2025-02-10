import styled, { createGlobalStyle } from 'styled-components'

const Global = createGlobalStyle`
* {
  margin:0;
  padding:0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #172136;
}`

const Body = styled.div`
  padding: 2em;
  color: white;
  background-color: #172136;

  display: flex;
  flex-direction: column;

  a {
    font-weight: bold;
    color: #8cabe6;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`

const Nav = styled.div`
  background-color: #313e59;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  a,
  p,
  h3,
  button {
    margin: 0.5rem;
    background-color: #313e59;
  }
  strong {
    background-color: #313e59;
  }

  a {
    font-size: 1.4em;
    padding: 0.5rem;
    transition:
      border-color 0.3s,
      background-color 0.3s;
  }

  a:hover {
    background-color: #cec1a6;
    color: #313e59;
  }
`
const Button = styled.button`
  background-color: #313e59;
  color: #cec1a6;
  font-weight: bold;
  padding: 0.7rem 1.5rem;
  border: 1px solid #cec1a6;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;

  &:hover {
    background-color: #cec1a6;
    color: #313e59;
  }
`

const Input = styled.input`
  background-color: #172136;
  color: #cec1a6;
  border: 1px solid #313e59;
  padding: 0.8rem 1rem;
  font-size: 1em;
  outline: none;

  &:focus {
    border-color: #8cabe6;
    background-color: #1f2a40;
  }

  &::placeholder {
    color: #8cabe6;
  }
`

const BlogDiv = styled.div`
  width: 30%;
  padding: 0.4rem;
  margin: 0.1rem 0;
  border: 1px solid #313e59;
  a {
    color: #8cabe6;

    &:hover {
      color: #cec1a6;
    }
  }
`

const SingleBlogDiv = styled(BlogDiv)`
  padding: 1.5rem;
  p,
  h4 {
    margin: 0.5rem 0;
  }
  ${Button} {
    padding: 0.4rem;
  }
  ${Input} {
    padding: 0.35rem;
  }

  li {
    list-style: none;
    background-color: #313e59;
    padding: 0.2rem;
    border: 1px solid #1f2a40;
  }
  li:nth-child(even) {
    background-color: #1f2a40;
  }
`

const UserTable = styled.table`
  width: 20%;
  border-collapse: collapse;
  margin: 2rem 0;

  th,
  td {
    text-align: left;
    padding: 0.8rem;
    border: 1px solid #313e59;
  }

  th {
    background-color: #313e59;
    color: #cec1a6;
    font-weight: bold;
    border: 1px solid #1f2a40;
  }

  tr:nth-child(even) {
    background-color: #1f2a40;
  }

  a {
    color: #8cabe6;
    text-decoration: none;

    &:hover {
      color: #cec1a6;
    }
  }
`

const PopUp = styled.div`
  background-color: ${(props) => (props.$type === 'ok' ? 'green' : 'red')};
  color: white;
  padding: 0.5rem;
  margin: 1rem;

  h3 {
    margin: 0;
    background-color: inherit;
  }
`

export default {
  Body,
  Nav,
  Button,
  Input,
  BlogDiv,
  UserTable,
  SingleBlogDiv,
  PopUp,
  Global,
}
