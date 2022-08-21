using Microsoft.AspNetCore.Mvc;

namespace TalStart.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController
{
    [HttpPost("/user")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddUser()
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }

    [HttpDelete("/user/{name}")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RemoveUser([FromRoute] string name)
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }

    [HttpPut("/user")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateUser([FromForm] Object user)
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }
}