import React from 'react'

const Header = ({headerTittle}) => (
  <h2>{headerTittle}</h2>
)
const Content = ({info}) => (
<p key={info.id}>{info.name} {info.exercises}</p>
)

const Total = ({total}) => {
  return(
  <>
    <h2>Total of {total} exercises</h2>
  </>
  )
}

const Course = ({course}) => {
  let totalExercises = course.parts.reduce(function(sum, course){
    return sum + course.exercises
  }, 0)

  return (
    <>
    <Header headerTittle={course.name}/>
    {course.parts.map((info)=> <Content key={info.id} info={info}/>)}
    <Total total={totalExercises}/>
    </>
  )
}

export default Course;

