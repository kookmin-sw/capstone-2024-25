package capstone.allbom.member.dto;

public record GeocodingResponse(
        Double latitude,
        Double longitude
) {
    public static GeocodingResponse from(String latitude, String longitude) {
        System.out.println("response-latitude = " + latitude);
        System.out.println("response-latitude = " + latitude);
        return new GeocodingResponse(
                Double.parseDouble(latitude),
                Double.parseDouble(longitude)
        );
    }
}
