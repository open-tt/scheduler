class AuthorizeApiRequest
  prepend SimpleCommand

  def initialize(headers = {})
    @headers = headers
  end

  def call
    user
  end

  private

  attr_reader :headers

  def user
    @user ||= User.find(decoded_auth_token[:user_id]) if decoded_auth_token
    if @user && user_has_enough_permissions
      @user
    else
      errors.add(:token, 'Invalid token')
      nil
    end
  end

  def user_has_enough_permissions
    method = headers['REQUEST_METHOD'].downcase
    # Cannot defined 'delete' as http_method in Actions because of
    # conflict, when receive 'delete' convert to 'del'
    method = 'del' if method == 'delete'
    http_method_enum = Action.http_methods[method]
    actions = @user.actions.where(method: http_method_enum)
    return false if actions.empty?

    url_path = headers['PATH_INFO']
    actions.each do |action|
      return true if url_path.match(/^#{action.url_regex}$/)
    end
  end

  def decoded_auth_token
    @decoded_auth_token ||= JsonWebToken.decode(http_auth_header)
  end

  def http_auth_header
    if headers['Authorization'].present?
      return headers['Authorization'].split(' ').last
    else
      errors.add(:token, 'Missing token')
    end
    nil
  end
end
