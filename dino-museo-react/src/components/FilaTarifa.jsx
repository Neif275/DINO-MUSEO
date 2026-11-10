function FilaTarifa({ categoria, precio })
{
    return(
        <tr>
            <td>{categoria}</td>
            <td>{precio}</td>
        </tr>
    );
}
export default FilaTarifa;