export default function MessageRow({firstName, lastName}) {
    // let date = new Date().getFullYear();
  
    return (
    <>
        <tr>
            <td>{firstName}</td>
            <td>{lastName}</td>
        </tr>
    </>
  )
}