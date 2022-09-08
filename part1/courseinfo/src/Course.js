import React from "react";
const Header = ({ Cname }) => {
    return (
        <div>
            <h1>Web development curriulum</h1>
            <h2>{Cname}</h2>
        </div>
    )
}
const Part = ({ part }) => {
    return (
        <div>
            <p>
                {part.name}
                {part.exercises}
            </p>
        </div>
    )
}
const Sum = ({ total }) => {
    const tot = total.reduce((s, p) => {
        return s + p.exercises
    }, 0)
    return (
        <div>
            <b>total of {tot} exercises</b>
        </div>
    )
}
const Content = ({ Ccontent }) => {

    return (
        <div>

            {Ccontent.map(part => (
                <Part key={part.id} part={part} />
            ))}
            <Sum total={Ccontent} />
        </div>
    )
}
const Course = ({ course }) => {

    return (
        <div>
            <Header Cname={course.name} />
            <Content Ccontent={course.parts} />
        </div>
    )
}
export default Course;