import ExpoModulesCore
import CallKit

public class ExpoCallstatusModule: Module {
  private let callObserver = CXCallObserver()

  public func definition() -> ModuleDefinition {
    Name("ExpoCallstatus")

    Function("getCallStatus") {
      self.getCallStatus()
    }
  }

  private func getCallStatus() -> String {
    let calls = callObserver.calls
    
    if calls.isEmpty {
      return "IDLE"
    } else {
      return "IN CALL"
    }
  }
}
