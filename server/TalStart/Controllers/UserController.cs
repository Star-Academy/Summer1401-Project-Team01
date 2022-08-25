using Microsoft.AspNetCore.Mvc;

namespace TalStart.Controllers;

[ApiController]
[Route("[controller]/[action]")]
public class UserController : ControllerBase
{
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> AddUser()
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }

    [HttpDelete("{username}")]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RemoveUser([FromRoute] string username)
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateUser([FromForm] string username)
    {
        await Task.Delay(3);
        return new BadRequestResult();
    }
}