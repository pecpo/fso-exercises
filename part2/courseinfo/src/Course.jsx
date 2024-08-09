const Header = ({ name }) => <h2>{name}</h2>;

const Total = ({ sum }) => <b>Number of exercises {sum}</b>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <>
      <Header name={name} />
      <Content parts={parts} />
      <Total sum={parts.reduce((acc, part) => acc + part.exercises, 0)} />
    </>
  );
};

export default Course;
