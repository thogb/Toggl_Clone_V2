namespace TogglTrackCloneApi.Exceptions
{
    public class TTServiceException : APIException
    {
        public TTServiceException(string message) : base(StatusCodes.Status400BadRequest, message)
        {
        }
    }
}
