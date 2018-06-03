componentDidMount()
{
    Promise.all([
        fetch(API + QUERY, {
            method: "GET",
            headers: {
                "Content-type": "application/json"
            }
        }),
        fetch(API + QUERY, {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            }
        })
    ])
}