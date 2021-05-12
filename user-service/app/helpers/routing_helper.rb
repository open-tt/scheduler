module RoutingHelper
  def reroute(url, method = :get, body = {}, query = {})
    success, response_or_error = proxy(url, method, body, query)
    if success
      render json: response_or_error.body.as_json, status: response_or_error.code
    else
      render json: response_or_error
    end
  end

  def proxy(url, method = :get, body = {}, query = {})
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
        # return
        [true, response]
      else
        begin
          error = resp_json['exception'].remove("\t").split("\n")
        rescue StandardError
          error = resp_json
        end
        # return
        [false, error]
      end
    rescue StandardError => e
      # return
      [false, e.message]
    end
  end
end
