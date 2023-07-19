namespace TogglTrackCloneApi.DTOs.BatchResponse
{
    public class BatchResponseDTO
    {
        public List<int> Success { get; set; } = new List<int>();
        public List<FailureDTO> Failure { get; set; } = new List<FailureDTO>();
    }
}
