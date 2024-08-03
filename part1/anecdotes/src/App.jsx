import { useState } from "react";

const Button = ({ handleClick, text }) => {
  return <button onClick={handleClick}>{text}</button>;
};

const Anecdote = ({ anecdote, votes }) => {
  return (
    <>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);
  const mostVotes = Math.max(...votes);
  const mostVoted = votes.indexOf(mostVotes);

  const changeAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };

  const giveVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={giveVote} text="vote" />
      <Button handleClick={changeAnecdote} text="next anecdote" />
      <h1>Anecode with most votes</h1>
      <Anecdote anecdote={anecdotes[mostVoted]} votes={mostVotes} />
    </>
  );
};

export default App;
