namespace TogglTrackCloneApi.Exceptions
{
    public class TTIllegalEditException : APIException
    {
        public TTIllegalEditException(string message) : base(StatusCodes.Status400BadRequest, message)
        {
        }
    }
}
