module RoutingHelper
  def reroute(url, method = :get, body = {}, query = {})
    expected_response_codes = {
      get: [200],
      post: [201],
      put: [204, 200],
      delete: [204, 200]
    }
    begin
      if method == :get
        response = HTTParty.get(url, query: query)
      elsif method == :post
        response = HTTParty.post(url, body: body, query: query)
      elsif method == :put
        response = HTTParty.put(url, body: body, query: query)
      elsif method == :delete
        response = HTTParty.delete(url, body: body, query: query)
      end

      resp_json = response.as_json
      if expected_response_codes[method.to_sym].include?(response.code)
        render json: response.body.as_json, status: response.code
      else
        begin
          error = resp_json['exception'].remove("\t").split("\n")
        rescue StandardError
          error = resp_json
        end
        render json: {
          error: error
        }, status: :internal_server_error
      end
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
  end
end
