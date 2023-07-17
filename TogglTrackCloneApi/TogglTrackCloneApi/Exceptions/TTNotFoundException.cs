namespace TogglTrackCloneApi.Exceptions
{
    public class TTNotFoundException : APIException
    {
        public TTNotFoundException(string message) : base(StatusCodes.Status404NotFound, message)
        {
        }
    }
}
