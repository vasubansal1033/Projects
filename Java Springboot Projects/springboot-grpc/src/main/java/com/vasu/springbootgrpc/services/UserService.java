package com.vasu.springbootgrpc.services;

import com.vasu.springbootgrpc.grpc.UserProto;
import com.vasu.springbootgrpc.grpc.userGrpc;
import io.grpc.stub.StreamObserver;

public class UserService extends userGrpc.userImplBase {
    @Override
    public void login(UserProto.LoginRequest request, StreamObserver<UserProto.APIResponse> responseObserver) {
        System.out.println("Inside login");

        String username = request.getUsername();
        String password = request.getPassword();

        UserProto.APIResponse.Builder response = UserProto.APIResponse.newBuilder();

        if (username.equals("vasubansal") && password.equals("password")) {
            response
                    .setResponseCode(200)
                    .setResponsemessage("SUCCESS");
        } else {
            response
                    .setResponseCode(404)
                    .setResponsemessage("FAILED TO AUTHENTICATE");
        }

        responseObserver.onNext(response.build());
        responseObserver.onCompleted();
    }

    @Override
    public void logout(UserProto.Empty request, StreamObserver<UserProto.APIResponse> responseObserver) {
        super.logout(request, responseObserver);
    }
}
